const validateLengthInput = require('../validation/length');
const validateAlphaRate = require('../validation/alphaRate');
const validateBlackListed = require('../validation/blackListed');
const validateQuotationRate = require('../validation/quotationRate');

exports.validate = async (req, res) => {
    try {
        console.log('registerNumber',req.body.vehicule['registerNumber'])
        const { errors, isValid } = validateLengthInput(req.body.contacts ? req.body.contacts : null);
        const { isAlphaNumericValid, alphaNumericErrors } = validateAlphaRate((req.body.contacts && req.body.contacts.email) ? req.body.contacts.email : '');
        const { blackListedErrors, isblackListedValid } = await validateBlackListed(req.body.vehicule.registerNumber ? req.body.vehicule.registerNumber : null)
        const { quotationRateErrors, isquotationValid } = await validateQuotationRate(req.body)

        if (!isValid || !isAlphaNumericValid || !isblackListedValid || !isquotationValid) {
            return res.status(200).json({
                reference: req.body.vehicule.registerNumber,
                scam: true,
                rules: errors.concat(alphaNumericErrors).concat(blackListedErrors).concat(quotationRateErrors)
            });
        }
        return res.status(200).json({
            reference: req.body.vehicule.registerNumber,
            scam: false,
            rules: []
        });
    } catch (err) {
        throw new Error(err.message);
    }
}
