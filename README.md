
This repository contains server & client side code using 


# Running Server(Node) and Client (Angular)

1. NodeJS 
2. Angular CLI 

## Clone repository

In order to start the project use:

$ git clone https://github.com/ramsheenarm/TeamChat.git

$ cd team-chat


## Run Server

To run server locally, just install dependencies and run `gulp` task to create a build:


$ cd server
$ npm install -g gulp-cli
$ npm install
$ gulp build
$ npm start

Ignore if any error during gulp build


The `socket.io` server will be running on port `8080`

## Run Angular Client

Open other command line window and run following commands:


$ cd client
$ npm install
$ ng serve


Now open your browser in following URL: [http://localhost:4200](http://localhost:4200/)

Start chatting :)
