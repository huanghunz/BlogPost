const express = require('express')

const path = require('path')

const app = express()

app.use(express.static(__dirname + "/dist/jokeApp"))

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'dist/jokeApp/index.html'));
})

app.listen(process.env.PORT || 8080)