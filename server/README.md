# Notification System server  
Node JS based backend for Notification System solutions.

Notifications are configured for the following types of events: file upload, download, and deletion.

By default, the notification is sent immediately, the number of notifications sent is unlimited.
When sending notifications immediately, events are not saved to the database.

The user can choose to send notifications every 5 minutes and limit the number of notifications received (according to the tips requirement). In this case, the events will be saved to the database and when the number of notifications reaches 10, they will be sent to the user in one email. Or every 5 minutes the scheduler will check for events in the database and, if there are, send one email to the user.

## Run with docker
Set the environment variable in the file .env

To run docker build
- docker build -t notification-server:latest .

To run docker image
- docker run -p 3001:3001 -v logs:/usr/src/app/data --env-file ./env --rm notification-server:latest

### Software info
- Node.js
- Mongodb

#### Main packages used
- express - web application framework
- express-fileupload - files uploader
- jsonwebtoken - handle JWT token
- mongoose - mongodb object modeling (*according to the tips requirement: For the database you must use MongoDB)
- nodemailer - sending email (*mailgun-js npm from the tips has been deprecated and nodemailer is more popular than node-mailgun npm)
- node-cron - job scheduler