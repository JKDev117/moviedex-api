//17.6 Assignment

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const MOVIEDEX = require('./moviedex.json');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'})
    }
    next();
}

app.use(validateBearerToken);

function handleGetMovie(req, res) {
     let response = MOVIEDEX;

     if(req.query.genre){
        response = response.filter(movie => {
            return movie.genre.toLowerCase().includes(req.query.genre.toLowerCase());
        })
     }

     if(req.query.country){
        response = response.filter(movie => {
            return movie.country.toLowerCase().includes(req.query.country.toLowerCase());
        })
     }
     
     if(req.query.avg_vote){
        response = response.filter(movie => {
            return movie.avg_vote > Number(req.query.avg_vote);
        })
     }

     res.json(response);

}

app.get('/movie', handleGetMovie);



const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening on at http://localhost:${PORT}`)
})


