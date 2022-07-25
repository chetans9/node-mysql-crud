// Update with your config settings.
var config = require('config');


module.exports = {

  development: {
    client: config.database.client,
    
    connection : {
      host : config.database.host,
      database : config.database.database,
      user : config.database.user,
      password : config.database.password
    },
  },

  staging: {
    client: 'pg',
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
    client: config.database.client,
    client: 'pg',
    connection: {
      host : config.database.host,
      database : config.database.database,
      user : config.database.user,
      password : config.database.password
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
