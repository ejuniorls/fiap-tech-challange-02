const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../config/auth");
const { RefreshToken } = require("../models");
const BaseService = require("./BaseService");
const UserService = require("./userService");

class AuthService extends BaseService {
  constructor() {
    super(RefreshToken);
    this.jwtConfig = jwtConfig; // Inicialize a configuração
  }

  generateToken(payload, expiresIn) {
    return jwt.sign(payload, jwtConfig.secret, { expiresIn });
  }

  generateTokenPair(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username
    };

    return {
      access_token: this.generateToken(payload, `${jwtConfig.access_expiration_minutes}m`),
      refresh_token: this.generateToken(payload, `${jwtConfig.refresh_expiration_days}d`)
    };
  }

  verifyToken(token) {
    return jwt.verify(token, jwtConfig.secret);
  }

  async saveRefreshToken(token, userId) {
    try {
      if (!token || !userId) {
        throw new Error("Token e userId são obrigatórios");
      }

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + this.jwtConfig.refresh_expiration_days);

      return await this.model.create({
        token,
        userId,
        expiresAt,
        isRevoked: false
      });
    } catch (error) {
      console.error("Erro ao salvar refresh token:", error);
      throw error;
    }
  }

  async verifyRefreshToken(token) {
    const payload = this.verifyToken(token);

    const refreshToken = await this.model.scope("valid").findOne({
      where: {
        token,
        userId: payload.sub
      }
    });

    if (!refreshToken) {
      const error = new Error("Refresh token inválido ou expirado");
      error.statusCode = 401;
      throw error;
    }

    return { token, userId: payload.sub };
  }

  async revokeRefreshToken(token) {
    console.log("token", token);

    const refreshToken = await RefreshToken.findOne({
      where: {
        token,
        deleted_at: null
      }
    });

    console.log("refreshToken", refreshToken);

    if (refreshToken) {
      console.log('cai aqui')
      refreshToken.isRevoked = true;
      await refreshToken.save();
    }
  }

  async refreshAccessToken(refreshToken) {
    const { userId } = await this.verifyRefreshToken(refreshToken);
    const user = await UserService.findById(userId);


    if (!user) {
      const error = new Error("Usuário não encontrado");
      error.statusCode = 404;
      throw error;
    }

    return this.generateToken(
      {
        sub: user.id,
        email: user.email,
        username: user.username
      },
      `${jwtConfig.access_expiration_minutes}m`
    );
  }

  async revokeAllUserTokens(userId) {
    const [affectedRows] = await this.model.update(
      { is_revoked: true },
      {
        where: {
          user_id: userId,
          is_revoked: false,
          deleted_at: null
        }
      }
    );

    return affectedRows;
  }
}

module.exports = new AuthService();