# Set environment variables
For the client and server, set the environment variable to .env files
Server variable FILES_DIR requires an absolute path

## Start Notification system
To run the client and server together, use the following commands:

In dev:
- docker-compose -f .\docker-compose-dev.yml up 

In prod:
- docker-compose -f .\docker-compose-prod.yml up 

Stop:
- docker-compose down