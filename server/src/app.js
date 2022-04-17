const express = require('express');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes.js');
const fileRouter = require('./routes/file.routes.js');
const notificationRouter = require('./routes/notification.routes.js');
const corsMiddleware = require('./middleware/cors.middleware.js');
const authMiddleware = require('./middleware/auth.middleware.js');
const db = require('./db');

const app = express();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/files', authMiddleware, fileRouter);
app.use('/api/notifications', authMiddleware, notificationRouter);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = app;
