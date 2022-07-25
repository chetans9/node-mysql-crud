const config = require('config');

var knex = require('knex')({

  client: 'pg',
  connection: config.database,
  ssl: { rejectUnauthorized: false },
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('pagination');


module.exports = bookshelf;