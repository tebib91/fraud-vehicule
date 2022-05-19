const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLengthInput(data) {
    let errors = [];
    // check the correct firstname length
    if (Validator.isByteLength(data && data.firstName ? data.firstName : '', { max: 1 })) {
        errors.push('rule::firstname::length');
    }
    // check the correct lastname length
    if (Validator.isByteLength(data && data.lastName ? data.lastName : '', { max: 1 })) {
        errors.push('rule::lastname::length');
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
