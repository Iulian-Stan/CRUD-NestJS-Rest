export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  swagger: {
    path: process.env.SWAGGER_PATH || 'api',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: process.env.JWT_EXPIRES || '300s',
  }
});