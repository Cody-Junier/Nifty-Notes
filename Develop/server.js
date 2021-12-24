const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const noteList = JSON.parse(data)
        res.json({noteList})
    })
})

app.get('*', (req, res) =>{
    res.sendFile(path.join('./public/index.html'))
})


app.listen(PORT, ()=>{
    console.log(`Nifty-Notes server now on port ${PORT}`);
})