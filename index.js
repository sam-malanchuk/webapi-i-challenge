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
                err: err,
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

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});