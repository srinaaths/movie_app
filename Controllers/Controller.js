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
        const pathToAppend = path.join(__dirname, '..', 'data.json')
        fs.writeFile(pathToAppend, JSON.stringify(moviesList), (err) => {
            if (err)
                console.log(err.message);
            else
                console.log('success');
        })
        res.end('Movie added succesfully')
    })
}

const updateMovie = (req, res, id) => {
    let data = "";
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        console.log(data);
        const parsedData = JSON.parse(data);
        parsedData.id = id;
        for(let i = 0; i < moviesList.length; ++i) {
            if(moviesList[i].id == id) {
                console.log('in');
                moviesList.splice(i, 1, parsedData);
                break;
            }
        }
        const pathToWrite = path.join(__dirname, '..', 'data.json')
        fs.writeFile(pathToWrite, JSON.stringify(moviesList), (err) => {
            if (err)
                console.log(err.message);
            else
                console.log('success');
        })
        res.end('movie updated succesfully')
    })
}

const deleteMovie = (req, res, id) => {
    for(let i = 0; i < moviesList.length; ++i) {
        if(moviesList[i].id == id) {
            moviesList.splice(i, 1);
            break;
        }
    }
    const pathToWrite = path.join(__dirname, '..', 'data.json')
    fs.writeFile(pathToWrite, JSON.stringify(moviesList), (err) => {
        if(err)
            console.log(err);
        else
            res.end('deletion succesful');
    })
}

const searchByGenre = async (req, res, searchTerm) => {
    // const resArr = [];
    // for(let i = 0; i < moviesList.length; ++i) {
    //     if(moviesList[i].genres.includes(searchTerm)) {
    //         resArr.push(moviesList[i])
    //     }
    // }

    // implementation using async await & filter

    try {
        const resArr = await MovieAPI.findByGenre(searchTerm);
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(resArr));
    } catch (error) {
        console.log(error);
    }
}

const addReview = (req, res, id) => {
    let data = "";
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        console.log(data);
    })
}

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, searchByGenre, addReview}