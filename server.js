const http = require('http')
const {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, searchByGenre} = require('./Controllers/Controller.js')

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
    else if(req.url.match(/\/update\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2];
        updateMovie(req, res, id);
    }
    else if(req.url.match(/\/delete\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[2];
        deleteMovie(req, res, id);
    }
    else if(req.url.match(/\/genre\/([a-zA-Z]*)/)) {
        const searchTerm = req.url.split('/')[2];
        searchByGenre(req, res, searchTerm)
    }
    else {
        console.log('invalid url');
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
            'error': 'invalid url'
        }));
    }
})
server.listen(PORT, () => console.log(`listening on port ${PORT}`))