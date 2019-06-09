var customersModel = require('../../models/customersModel');

var createError = require('http-errors');
const {check, validationResult} = require('express-validator/check');

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.index = async function (req, res) {

   
    var data = {};
    var query = customersModel.forge();


    if (req.query.reference_id) {

        query = query.where({reference_id: req.query.reference_id});
    }


    // query = query.query(function (q) {
    //     q.limit(500);
    // });

    var customersCollection = await query.fetchAll();

    var form_data = req.query;
    data = {
        form_data: form_data
    };

    if (customersCollection) {
        data.customers = customersCollection.toJSON();
    }

    res.render('customers/index', data);
};


exports.create = function(req,res){

    res.render('customers/create');
}

exports.store = function(req,res){

}

/**
 * Show ticket page
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

exports.edit = async function (req, res, next) {

    var reference_id = req.params.reference_id;

    try {
        var CRMTicket = await CRMTicketsModel.forge().where({reference_id: reference_id}).fetch({
            withRelated: ['product', 'bank_branch']
        });

        if(!CRMTicket){
            return next(createError(404));
        }

        const formData = req.flash('form')[0];

        var data = {
            CRMTicket: CRMTicket.toJSON(),
            form: (formData) ? formData : CRMTicket.toJSON() ,
        };

        return res.render('customerCare/show', data);

    } catch(err) {

    }


};

/**
 *
 * @param req
 * @param res
 * @param next
 */

exports.update = [

    check('crm_sr_no').not().isEmpty().withMessage('CRM SR No is Required'),
    check('status').not().isEmpty().withMessage('Please Select Status')

    , async function (req, res) {

        var updateData = {
            status: req.body.status,
            crm_sr_no: req.body.crm_sr_no,
            remarks: req.body.remarks
        };

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('form',req.body);
            req.flash('errors',errors.mapped());
            return res.redirect(req.backUrl);
        }

        var CRMTicket = await CRMTicketsModel.where({reference_id: req.params.reference_id}).fetch();

        var CRMTicketModel = CRMTicket.save(updateData);
        req.flash('success', 'CRM ticket Updated successfully');

        return res.redirect(req.getUrl + '/customer-care/search');



    }];


    exports.destroy = function(req,res){

    } 








