const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const saveCar = (req, res, next) => {
    const validationRule = {
      nickName: 'required|string',
      make: 'required|string',
      model: 'required|string',
      year: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  const saveMaintenance = (req, res, next) => {
    const validationRule = {
      mileage: 'required|string',
      part: 'required|string',
      dateInstalled: 'required|string',
      cost: 'required|string',
      description: 'required|string',
      notes: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  const saveWarranty = (req, res, next) => {
    const validationRule = {
      purchasedDate: 'required|string',
      purchasedFrom: 'required|string',
      expiredDate: 'required|string',
      notes: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  module.exports = {
    saveCar,
    saveMaintenance,
    saveWarranty
};