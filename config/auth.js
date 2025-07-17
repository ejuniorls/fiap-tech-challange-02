require('dotenv').config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
    access_expiration_minutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 15,
    refresh_expiration_days: process.env.JWT_REFRESH_EXPIRATION_DAYS || 7
  },
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: (process.env.JWT_REFRESH_EXPIRATION_DAYS || 7) * 24 * 60 * 60 * 1000
  }
};

// Imprime no console
// console.log('Configurações carregadas:', config);

module.exports = config;