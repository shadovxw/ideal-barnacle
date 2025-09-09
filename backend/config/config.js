// config/config.js
require('dotenv').config(); // loads .env into process.env

module.exports = {
  development: {
    use_env_variable: process.env.DEV_USE_ENV_VARIABLE === 'true' ? 'DATABASE_URL' : undefined,
    username: process.env.DB_USER || 'your_dev_db_user',
    password: process.env.DB_PASS || 'your_dev_db_pass',
    database: process.env.DB_NAME || 'vy_foundation_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
  },

  test: {
    use_env_variable: process.env.TEST_USE_ENV_VARIABLE === 'true' ? 'DATABASE_URL' : undefined,
    username: process.env.TEST_DB_USER || process.env.DB_USER || 'your_test_db_user',
    password: process.env.TEST_DB_PASS || process.env.DB_PASS || 'your_test_db_pass',
    database: process.env.TEST_DB_NAME || (process.env.DB_NAME ? `${process.env.DB_NAME}_test` : 'vy_foundation_test'),
    host: process.env.TEST_DB_HOST || process.env.DB_HOST || '127.0.0.1',
    port: process.env.TEST_DB_PORT || process.env.DB_PORT || 5432,
    dialect: process.env.TEST_DB_DIALECT || process.env.DB_DIALECT || 'postgres',
    logging: false
  },

  production: {
    // In production it's common to use a single DATABASE_URL env var (postgres://...)
    use_env_variable: process.env.PROD_USE_ENV_VARIABLE === 'true' ? 'DATABASE_URL' : undefined,
    username: process.env.DB_USER || undefined,
    password: process.env.DB_PASS || undefined,
    database: process.env.DB_NAME || undefined,
    host: process.env.DB_HOST || undefined,
    port: process.env.DB_PORT || undefined,
    dialect: process.env.DB_DIALECT || (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres') ? 'postgres' : undefined),
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
  }
};
