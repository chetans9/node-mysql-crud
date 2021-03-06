const config = require('config');

var knex = require('knex')({

  client: 'mysql',
  connection: config.database
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('pagination');


module.exports = bookshelf;