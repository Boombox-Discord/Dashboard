const express = require('express');
const path = require('path')
require('dotenv').config();

const app = express();
app.use(express.json())

app.use('/discord', require('./app/api/discord'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './App/Public/HTML/index.html'))
})

app.listen(5000, () => {
    console.info('Running on port 5000')
})