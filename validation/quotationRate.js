
const isEmpty = require('./is-empty');
const { quotation } = require('../Services/quotation')

module.exports = async function validateQuotationRate(data) {
    let quotationRateErrors = [];
    const quotationval = await quotation(data.vehicule)

    // check if the price is acceptable
    if (quotationval - quotationval * 0.2 > data.price || data.price > quotationval + quotationval * 0.2 || data.price == undefined) {
        quotationRateErrors.push('rule::price::quotation_rate');
    }
    return {
        quotationRateErrors,
        isquotationValid: isEmpty(quotationRateErrors)
    };
}
