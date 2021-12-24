const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const noteList = JSON.parse(data)
        res.json(noteList)
    })
})

app.post('/api/notes', (req, res) =>{
    const newNote = req.body;

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const notesArray = JSON.parse(data);
        const noteId = uuidv4();
        newNote.id = noteId;
        notesArray.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err)=>{
            if(err){res.send(404)}
            res.json ({ message: 'success', newNote});
        });
    })
})

app.delete('/api/notes/:id', (req,res)=>{
    const delNote = req.params.id;

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const notesArray = JSON.parse(data);
        const newNotesArray = notesArray.filter(note=>{
                if(note.id !== delNote){
                    return note;
                }

            });
        fs.writeFile('./db/db.json', JSON.stringify(newNotesArray), (err)=>{
            if(err){res.send(404)}
            res.json ({ message: 'success', delNote});
        });
    })
})

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(PORT, ()=>{
    console.log(`Nifty-Notes server now on port ${PORT}`);
})