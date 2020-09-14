# Github Search App

Web app that allows the user to query the github V3 search API for different repos. Users can sort these repos by stars and last updated as well as filter by programming language. When a user clicks on a repo, they are routed to a detail view of that repo. 

Check it out live: https://repo-review.herokuapp.com/

## Up and Running
Before starting the app, make sure to set the ENVs in the api directory. See api/README.md for more

**1) Docker** 

Run the followng command from the root of the directory:

```shell
$ docker-compose up --build
```

This will start the api and make it available on port 8080.
It will also start the client on port 8081. 
To view the app got to `http://localhost:8081`

**2) Node**

To start the app with node, we need to seperately start the client and the api.

**2.a) Staring the api:**
```shell
$ cd ./api
$ npm i --silent && npm run build:dev && npm run serve
```

This starts the API server on port `:3000`

**2.b) Staring the client:**

Run the following commands from the `./api` directory
```shell
$ cd ../web 
$ npm i --silent && npm run start
```

This starts the client on port `:3001`



