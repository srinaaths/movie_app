const movieList = require('../data.json')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(movieList);
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        for(movie of movieList) {
            if(movie.id == id)
                resolve(movie)
        }
        reject('no movies found')
    })
}

module.exports = {
    findAll, findById
}