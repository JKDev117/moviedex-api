//17.6 Assignment

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use((req, res) => {
    res.send("Hello Jae!")
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening on at http://localhost:${PORT}`)
})


