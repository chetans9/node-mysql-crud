var bookshelf = require('./base');


var customersModel = bookshelf.Model.extend({
    /**
     * Table name
     */
    tableName: 'customers',
    hasTimestamps: true,

});


module.exports = bookshelf.model('customersModel',customersModel);