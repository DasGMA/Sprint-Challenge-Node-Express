const express = require('express');
const router = express.Router();

const db = require('../Data/helpers/projectModel');

router.get('/', (req, res) => {

    db.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting projects list ', error ));
    })

})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json(console.error( 'Error getting project ', error ));
    })
})


router.get('/:id/actions', (req, res) => {
    const { id }  = req.params;

    db.getProjectActions(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json(console.error(`Error getting actions. See error ${error}`));
    })
})

router.post('/add', (req, res) => {
    const project = req.body;
    const length = 128;
    
    if (Object.keys(project).length <= 2) {
                   
        if (Object.keys(project).includes('name') && Object.keys(project).includes('description')) { 
             
          if (typeof project.name === 'string' && typeof project.description === 'string') {
              
            if (project.name.trim().length === 0 || project.description.trim().length === 0) {
              res.status(422).json(console.error('Name and description are required'));
            }
               
                if (project.name.trim().length > length) {
                    res.status(411).json(console.error('Name is too long.'));
                }
            else {
              db.insert(project)
              .then(project => {
                res.status(200).json(project);
              })
              .catch(error => {
                res.status(500).json(console.error( 'Can not post', error));
              })
            }
          } else {
            res.status(422).json(console.error(`The value of 'name' has to be a string, not ${Object.prototype.toString.call(project.name)}!`));
          }
        } else {
          res.status(422).json(console.error(`JSON is missing required 'name'`));
        }
      } else {
        res.status(422).json(console.error('JSON has too many attributes'));
      }
    });

    router.put('/:id/update', (req, res) => {
        const { id } = req.params;
        const project = req.body;
    
        db.update(id, project)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json(console.error( `Could not update. Refer to ${error}`));
        })
    })
    
    router.delete('/:id/delete', (req, res) => {
        const { id } = req.params;
    
        db.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json(console.error(`Can not delete. Refer to ${error}`));
        })
    })

module.exports = router;