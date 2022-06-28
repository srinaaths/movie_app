const MovieAPI = require('../ModelAPIs/MovieAPIs.js')

const getAllMovies = async (req, res) => {
    try {
        const data = await MovieAPI.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}

const getMovieById = async (req, res, id) => {
    try {
        const data = await MovieAPI.findById(id);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(data))
    } catch (error) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({'error': error}))
    }
}

module.exports = {getAllMovies, getMovieById}