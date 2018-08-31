const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel');


router.get('/', (req, res)=> {
    db.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting actions ', error))
    })

})

router.get('/:id', (req, res)=> {
    const { id } = req.params;

    db.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting action ', error))
    })
})


router.post('/add', (req, res) => {
    const action = req.body;
    const length = 128;
    
    if (Object.keys(action).length <= 3) {
                   
        if (Object.keys(action).includes('project_id') && Object.keys(action).includes('description') && Object.keys(action).includes('notes')) { 
             
          if (typeof action.notes === 'string' && typeof action.description === 'string' && typeof action.project_id === 'number') {
              
            if (action.notes.trim().length === 0 || action.description.trim().length === 0 || !action.project_id) {
              res.status(422).json(console.error('Notes and description are required'));
            }
               
                if (action.description.trim().length > length) {
                    res.status(411).json(console.error('Description is too long.'));
                }
            else {
              db.insert(action)
              .then(action => {
                res.status(200).json(action);
              })
              .catch(error => {
                res.status(500).json(console.error( 'Can not post', error));
              })
            }
          } else {
            res.status(422).json(console.error(`The value of 'name' has to be a string, not ${Object.prototype.toString.call(action.name)}!`));
          }
        } else {
          res.status(422).json(console.error(`JSON is missing required 'project_id', 'description' or 'notes'`));
        }
      } else {
        res.status(422).json(console.error('JSON has too many attributes'));
      }
    });


router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const action = req.body

    db.update(id, action)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error updating action', error))
    })
})

router.delete('/:id/delete', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error deleting action', error))
    })
})

module.exports = router;