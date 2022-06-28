const MovieAPI = require("./MovieAPIs.js")

const getAllMovies = async (req, res) => {
    try {
        const data = await MovieAPI.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}