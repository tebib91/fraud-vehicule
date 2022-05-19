//mock to verify if a car is blackListed or not
const verif = (matricule) => {
    if (matricule == "AA123AA") {
        return true
    } else {
        return false
    }
}
exports.isBlackListed = (matricule) => new Promise((resolve, reject) => setTimeout(resolve, 50, verif(matricule)))
