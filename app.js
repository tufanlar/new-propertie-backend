const express = require('express');
const api = require('./routes/api');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/v1', api);

app.use((req, res, next) => {
    throw new Error(`${req.url} page not found!`);
})

app.use((err, req, res, next) => {
    console.log(err);
    res.send({message:err.message, isError:true})
})

module.exports = app
