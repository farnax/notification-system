# Notification System client  
Starts at 3000 port.
React based frontend for Notification System solutions.

Register a new user and then log in.
To navigate, use navbar. The Disk tab provides the ability to upload, download and delete files. For each of these actions, the server will generate and send an event of the appropriate type to the user's email.
To see the download and delete buttons, hover the cursor over the corresponding file.
To set the frequency and limit of notifications, go to notification options.

## Run with docker
To run docker build dev
- docker build -t notification-client:dev .

To run docker production build prod
- docker build -f Dockerfile.prod -t notification-client:prod .

To run docker image pre-selecting dev or prod
- docker run -p 3000:3000 --env-file ./env --rm notification-client:dev
- docker run -p 1337:80 --env-file ./env --rm notification-client:prod

### Software info
- JavaScript

#### Main packages used
- react - web application framework
- redux - state container
- react-router-dom - navigation
- axios - HTTP client for external API integration