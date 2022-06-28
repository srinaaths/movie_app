const http = require('http')
const {getAllMovies} = require('./Controllers/Controller.js')

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    if(req.url === '/movies' && req.method === 'GET') {
        getAllMovies(req, res);
    }
})
server.listen(PORT, () => console.log(`listening on port ${PORT}`))