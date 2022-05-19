//mock to verify if the price of the car is acceptable or not
const price = (vehicule) => {
    return 35000
}
exports.quotation = (vehicule) => new Promise((resolve, reject) => setTimeout(resolve, 50, price(vehicule)))
