const router = require('express').Router();
const notes = require ('../../db.json');
const {notes} = require('../../db.json')


router.get('/notes', (req, res) =>{
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

router.post('/notes', (req, res) =>{
    
})