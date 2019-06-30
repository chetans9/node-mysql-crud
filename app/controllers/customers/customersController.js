let customersModel = require('../../models/customersModel');

var createError = require('http-errors');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async function (req, res) {
    try {
        var query = customersModel.forge();

        if (req.query.reference_id) {
            query = query.where({ reference_id: req.query.reference_id });
        }

        query = query.orderBy('created_at', 'DESC');
        var page = req.query.page;

        var customersCollection = await query.fetchPage({
            pageSize : 10,
            page : page
        });

        var searchFormdata = req.query;
        var data = {
            searchFormdata: searchFormdata,
            
        };

        if (customersCollection) {
            data.customers = customersCollection.toJSON();
            data.paginationData = customersCollection.pagination;
            data.paginationBaseUrl = '/customers';
        }
        data.title = 'Customers';
        return res.render('customers/index', data);

    }
    catch (err) {
        console.error(err);

    }

};


exports.create = function (req, res) {

    var isEditForm = isEditForm;
    var formData = req.flash('formData')[0];

    var data = {
        title: 'Add Customer',
        isEditForm: isEditForm,
        form: formData
    };

    res.render('customers/add_edit', data);
}

exports.store = [
    validationRules(),
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.mapped());
                req.flash('formData', req.body);
                return res.redirect(req.backUrl);
            }
            const requiredData = matchedData(req, { locations: ['body'] });

            var customer = await new customersModel(requiredData).save();

            req.flash('success', 'customer created successfully');
            return res.redirect('/customers');

        } catch (err) {
            console.log(err);
        }
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
        var customers = await customersModel.forge().where({ id: id }).fetch();

        if (!customers) {
            return next(createError(404));
        }

        const formData = req.flash('form')[0];
        var isEditForm = true;

        var data = {
            customers: customers.toJSON(),
            form: (formData) ? formData : customers.toJSON(),
            isEditForm: isEditForm
        };

        return res.render('customers/add_edit', data);

    } catch (err) {
        console.error(err);
    }
};

function validationRules() {
    return [
        check('first_name').not().isEmpty().withMessage('First name is required'),
        check('last_name').not().isEmpty().withMessage('Last name is required'),
        check('gender').not().isEmpty().withMessage('Gender is required').isIn(['M', 'F']),
        check('date_of_birth').toDate().optional({ checkFalsy: true }),
        check('mobile').optional({ checkFalsy: true }).isInt(),
        check('address').optional({ checkFalsy: true, nullable: true }).isLength({ min: 10 }).withMessage('Please enter minimum 10 characters'),
        check('email').optional({ checkFalsy: true, nullable: true }).isEmail().withMessage('Please enter valid email')
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

        var formData = req.body;
        console.log(formData);
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.mapped());
                req.flash('formData', req.body);
                return res.redirect(req.backUrl);
            }

            const requiredData = matchedData(req, { locations: ['body'] });
            await new customersModel({ id: req.params.id }).save(requiredData);
            req.flash('success', 'customer Updated successfully');
            return res.redirect('/customers');

        } catch (err) {
            console.log(err);
            res.send(err);

        }
    }];


exports.destroy = function (req, res) {


    customersModel.forge().where({ id: req.params.id }).fetch().then(function (CustomerModelBase) {
        CustomerModelBase.destroy();
        req.flash('info', 'Customer deleted successfully');
        return res.redirect('/customers');
    }).catch(function (err) {
        console.log(err);
    });

}








