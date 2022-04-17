const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    console.error('Connection error', err.message);
  });

const db = mongoose.connection;

module.exports = db;
