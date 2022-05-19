const isEmpty = require('./is-empty');

module.exports = function validateAlphaRate(data) {
    let alphaNumericErrors = [];
    const alphanumRegex = process.env.ALPHANUMREGEX ? new RegExp(process.env.ALPHANUMREGEX) : /^[a-zA-Z0-9 èàùìòÈÀÒÙÌéáúíóÉÁÚÍÓëäüïöËÄÜÏÖêâûîôÊÂÛÎÔç'-]*$/ ;
    const numRegex = process.env.NUMREGEX ? new RegExp(process.env.NUMREGEX) : /^[0-9'-]*$/ ;
    chars = data.split('@')[0].split('');
    alphanums = 0;
    nums = 0;

    for (let i = 0; i < chars.length; i++) {
        //count the alphanums caracters
        if (alphanumRegex.test(chars[i])) {
            alphanums++;
        }
        //count the num caracters
        if (numRegex.test(chars[i])) {
            nums++;
        }
    }

    // check the correct alphanum rate
    if ((100 * alphanums) / data.split('@')[0].length < 70 || chars.length == 0) {
        alphaNumericErrors.push('rule::alpha_rate');
    }
    //check the correct num rate
    if ((100 * nums) / data.split('@')[0].length > 30 || chars.length == 0) {
        alphaNumericErrors.push('rule::number_rate');
    }
    return {
        alphaNumericErrors,
        isAlphaNumericValid: isEmpty(alphaNumericErrors)
    };

}
