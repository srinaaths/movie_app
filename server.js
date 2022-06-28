const http = require('http')
const {getAllMovies, getMovieById, addMovie} = require('./Controllers/Controller.js')

// const data = require('./data.json')

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    if(req.url === '/movies' && req.method === 'GET') {
        getAllMovies(req, res);
    }
    else if(req.url.match(/\/movies\/([0-9]+)/)) {
        const id = (req.url.split('/'))[2];
        getMovieById(req, res, id);
    }
    else if(req.url === '/addmovie' && req.method === 'POST') {
        addMovie(req, res);
    }
})
server.listen(PORT, () => console.log(`listening on port ${PORT}`))