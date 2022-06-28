const data = require('../data.json')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}

module.exports = {
    findAll
}