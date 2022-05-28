// Update with your config settings.
var config = require('config');
console.log();

module.exports = {

  development: {
    client: 'mysql',
    
    connection : {
      host : config.database.host,
      database : config.database.database,
      user : config.database.user,
      password : config.database.password
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
