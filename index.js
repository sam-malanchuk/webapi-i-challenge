// express server setup
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());

// POST insert()
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    if(newUser.name && newUser.bio) {
        db.insert(newUser)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            });
        });
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
    }
});

// GET find()
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: "The users information could not be retrieved."
            })
        });
});

// GET findById()
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            if(user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user information could not be retrieved." 
            });
        });
});

// DELETE remove()
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(removed => {
            if(removed) {
                res.status(200).json({
                    message: "The user with the specified ID has been deleted"
                });
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The user could not be removed." 
            });
        });
});

// PUT update()
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(changes.name && changes.bio) {
        db.update(id, changes)
            .then(updated => {
                if (updated) {
                    res.status(200).json({
                        message: "The user with the specified ID has been updated."
                    });
                } else {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: "The user information could not be modified"
                });
            });
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        });
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});