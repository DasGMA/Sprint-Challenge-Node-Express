const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');

// Request to get all posts 
router.get('/', (req, res)=> {
    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting actions ', error))
    })

})

// Request to get a post 
router.get('/:id', (req, res)=> {
    const { id } = req.params;

    db.get(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting action ', error))
    })
})

module.exports = router;