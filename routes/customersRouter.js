var express = require('express');
var router = express.Router();
var customersController = require('../app/controllers/customers/customersController');

/* GET users listing. */
router.get('/', customersController.index);
router.get('/create', customersController.create);
router.post('/', customersController.store);
router.get('/:id/edit', customersController.edit);
router.post('/:id/edit', customersController.update);
router.post('/:id/delete', customersController.destroy);


module.exports = router;
