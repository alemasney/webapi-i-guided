
const express = require('express');
const db = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.get('/', (request, response) => {
    response.send('hello world form express!!');
})

server.get('/now', (request, response) => {
    const now = new Date().toISOString();
    response.send(now);
})

server.get('/hubs', (request, response) => {
    db.find()
        .then(hubs => {
            response.status(200).json(hubs);
        })
        .catch(error => {
            response.status(500).json({ success: false, error});
        })
})

server.post('/hubs', (request, response) => {
    const hubInfo = request.body;

    db.add(hubInfo)
        .then(hub => {
            response.status(201).json({ success: true, hub });
        })
        .catch( err => {
            response.status(500).json({ success: false, err});
        })
})

server.put('/hubs/:id', (request, response) => {
    const { id } = request.params;
    const hubInfo = request.body;

    db.update(id, hubInfo)
        .then(updatedItem => {
            if (updatedItem) {
                response.status(200).json({ success: true, updatedItem });
            } else {
                response.status(404).json({ success: false, message: 'cannot find the hub you are looking for' })
            }
        })
        .catch(err => {
            response.status(500).json({ success: false, err });
        })
})

server.delete('/hubs/:id', (request, response) => {
    const {id} = request.params;

    db.remove(id)
        .then( deletedItem => {
            if(deletedItem) {
                response.status(204).end();
            } else {
                response.status(404).json({ success: false, message: "cannot find the hub you are looking for"});
            }
        })
        .response.status(500).json({ success: false, err});
})

server.listen(4000, () => {
    console.log('server listening on port 4000');
})

