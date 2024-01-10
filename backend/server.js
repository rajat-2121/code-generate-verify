const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// database connection
const DB_URL = process.env.MONGODB_URL
mongoose.set('strictQuery', true)
mongoose.connect(DB_URL)
    .then(() => console.log("database connected!"))
    .catch((err) => { console.log(err) } )

app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.use((req, res, next) => {
    console.log(`HTTP Method- ${req.method}, URL- ${req.url}`)
    next()
})

// api endpoints
app.use('api/codes',codeRoute);

// server listener
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server listening on port ${port}`))

module.exports = app