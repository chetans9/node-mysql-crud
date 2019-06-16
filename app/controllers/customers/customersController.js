let customersModel = require('../../models/customersModel');

var createError = require('http-errors');
const {check, validationResult} = require('express-validator/check');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async function (req, res) {

    var query = customersModel.forge();
    

    if (req.query.reference_id) {
        query = query.where({reference_id: req.query.reference_id});
    }
    query = query.query(function (q) {
        q.limit(500);
    });

    var customersCollection = await query.fetchAll();

    var form_data = req.query;
    var data = {
        form_data: form_data
    };

    if (customersCollection) {
        data.customers = customersCollection.toJSON();
    }
    data.title = 'Customers';
    return res.render('customers/index', data);
};


exports.create = function(req,res){

    if(req.errors){
        //data.form = req.formData;
    }
    var data = {
        title : 'Add Customer'
    };

    res.render('customers/add_edit',data);
}

exports.store = [
    validationRules()
    ,
    async function(req,res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
        console.log(errors.mapped());
        req.flash('errors',errors.mapped());
        return res.redirect(req.backUrl);
    }

    var customer = await new customersModel(req.body).save();

    req.flash('success','custoemr created successfully');
    return res.redirect('/customers');
}]

/**
 * Show ticket page
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

exports.edit = async function (req, res, next) {

    var id = req.params.id;

    try {
        var customers = await customersModel.forge().where({id: id}).fetch();

        if(!customers){
            return next(createError(404));
        }

        const formData = req.flash('form')[0];

        var data = {
            customers: customers.toJSON(),
            form: (formData) ? formData : customers.toJSON() ,
        };

        return res.render('customers/add_edit', data);

    } catch(err) {
        console.error(err);
       throw new err;
    }


};

function validationRules() {
    return [
        check('first_name').not().isEmpty().withMessage('First name is required'),
        check('last_name').not().isEmpty().withMessage('Last name is required'),
        check('gender').not().isEmpty().withMessage('Gender is required').isIn(['M','F']),
        check('date_of_birth').not().isEmpty().withMessage('Date of birth is required'),
        check('address').optional({checkFalsy : true}).isLength({min : 10}).withMessage('Please enter minimum 10 characters'),
        check('email').optional({checkFalsy : true}).isEmail().withMessage('Please enter valid email')
    ];
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.update = [
    validationRules()

    , async function (req, res) {

      



    }];


    exports.destroy = function(req,res){

    } 








