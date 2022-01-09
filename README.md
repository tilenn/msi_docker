# msi_docker
Homework: Automating deployment of application stacks

# Simple book review app

A simple web app that can be used for storing book reviews of one's favourite books. It uses React for frontend, Express for backend, MongoDB for the database and Nginx as a web server. It's meant to be used with Docker Compose.

## How to use
Clone the repository, open the folder in the terminal and use the 'docker-compose up'. After it's finished, the app will be exposed to run on port 3050 ('localhost:3050').
The app itself is straightforward. After you press the 'Add review' button, the request gets processed by the Express backend and saved. Same goes for deleting. Volumes are used so that the data is persistent and not lost when the app is stopped.
