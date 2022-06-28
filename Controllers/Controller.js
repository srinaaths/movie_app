const MovieAPI = require('../ModelAPIs/MovieAPIs.js')
const moviesList = require('../data.json')
const path = require('path')
const fs = require('fs')

const getAllMovies = async (req, res) => {
    try {
        const data = await MovieAPI.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}

const getMovieById = async (req, res, id) => {
    try {
        const data = await MovieAPI.findById(id);
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
    } catch (error) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 'error': error }))
    }
}

const addMovie = async (req, res) => {
    let data = "";
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        const parsedData = JSON.parse(data);
        parsedData.id = moviesList[moviesList.length - 1].id + 1;
        moviesList.push(parsedData);
        res.end('Movie added succesfully')
        const pathToAppend = path.join(__dirname, '..', 'data.json')
        fs.writeFile(pathToAppend, JSON.stringify(moviesList), (err) => {
            if (err)
                console.log(err.message);
            else
                console.log('success');
        })
    })
}

module.exports = { getAllMovies, getMovieById, addMovie }