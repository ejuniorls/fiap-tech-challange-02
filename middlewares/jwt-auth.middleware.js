const AuthService = require("../services/auth.service");

module.exports = {
  authenticate: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("Token de autenticação necessário");
      error.statusCode = 401;
      return next(error);
    }

    try {
      req.user = AuthService.verifyToken(token);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        error.message = "Token expirado";
        error.statusCode = 401;
        error.code = "TOKEN_EXPIRED";
      } else {
        error.message = "Token inválido";
        error.statusCode = 403;
      }
      next(error);
    }
  },

  handleTokenRefresh: async (err, req, res, next) => {
    if (err.code === "TOKEN_EXPIRED") {
      try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
          return res.status(401).json({ error: "Refresh token necessário" });
        }

        const accessToken = await AuthService.refreshAccessToken(refreshToken);
        return res.status(200).json({
          access_token: accessToken,
          expires_in: jwtConfig.access_expiration_minutes * 60,
        });
      } catch (error) {
        return next(error);
      }
    }
    next(err);
  },
};
