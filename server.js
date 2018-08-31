const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 9000;

const actionsRouter = require('./Routers/actionsRouter');
const projectsRouter = require('./Routers/projectsRouter');

const logger = (req, res, next ) => {
    console.log(req.body)

    next();
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);


server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);



server.get('/', (req, res) => {
    res.send({message: 'Server is running'});
});


server.listen(port, () => console.log(`API is running on ${port} port!`));
