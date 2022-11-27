export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  swagger: {
    path: process.env.SWAGGER || 'api',
  }
});