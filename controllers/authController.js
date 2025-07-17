const AuthService = require('../services/authService');
const UserService = require('../services/userService');
const { jwt: jwtConfig, cookieOptions } = require('../config/auth');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Email e senha são obrigatórios',
            code: 'VALIDATION_ERROR'
          }
        });
      }

      const user = await UserService.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Credenciais inválidas',
            code: 'INVALID_CREDENTIALS'
          }
        });
      }

      const isPasswordValid = await UserService.verifyPassword(user, password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Credenciais inválidas',
            code: 'INVALID_CREDENTIALS'
          }
        });
      }

      const { access_token, refresh_token } = AuthService.generateTokenPair(user);
      await AuthService.saveRefreshToken(refresh_token, user.id);

      res.cookie('refresh_token', refresh_token, cookieOptions);

      return res.json({
        success: true,
        user: user.toJSON(),
        access_token,
        expires_in: jwtConfig.access_expiration_minutes * 60
      });

    } catch (error) {
      console.error('Erro completo no login:', {
        message: error.message,
        stack: error.stack,
        ...error
      });

      return res.status(500).json({
        success: false,
        error: {
          message: 'Erro interno no servidor',
          type: 'SERVER_ERROR',
          code: 'INTERNAL_SERVER_ERROR',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
      });
    }
  },

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refresh_token || req.body.refresh_token;
      if (!refreshToken) {
        const error = new Error('Refresh token é obrigatório');
        error.statusCode = 400;
        throw error;
      }

      const accessToken = await AuthService.refreshAccessToken(refreshToken);
      res.json({
        access_token: accessToken,
        expires_in: jwtConfig.access_expiration_minutes * 60
      });

    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log('refreshToken', refreshToken);
      if (refreshToken) {
        await AuthService.revokeRefreshToken(refreshToken);
        res.clearCookie('refresh_token');
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      const user = await UserService.findById(req.user.sub);
      if (!user) {
        const error = new Error('Usuário não encontrado');
        error.statusCode = 404;
        throw error;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
};