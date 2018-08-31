const express = require('express');
const router = express.Router();

const db = require('../Data/helpers/projectModel');

router.get('/', (req, res) => {

    db.get()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting projects list ', error ));
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting project ', error ));
    })
})

module.exports = router;