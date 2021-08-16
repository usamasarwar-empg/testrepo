require('dotenv').config(); // this is important!

module.exports = {
  development: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    logging: false,
    dialect: 'postgres'
  },
  test: {
    username: process.env.user_test,
    password: process.env.password_test,
    database: process.env.database_test,
    host: process.env.host_test,
    dialect: 'postgres'
  },
  production: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'postgres'
  }
};
