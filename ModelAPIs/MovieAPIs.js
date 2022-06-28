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

const findByGenre = (searchTerm) => {
    let res = [];
    const isGenreMatching = (movie) => {
        if(movie.genres.includes(searchTerm))
            return true;
    }
    return new Promise((resolve, reject) => {
        resolve(movieList.filter(isGenreMatching))
    })
}

module.exports = {
    findAll, findById, findByGenre
}