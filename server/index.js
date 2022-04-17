require('dotenv').config();
const app = require('./src/app.js');

const port = parseInt(process.env.PORT) || 3001;

const start = () => {
    app.listen(port, () => {
        console.log('Server started');
    });
};

start();
