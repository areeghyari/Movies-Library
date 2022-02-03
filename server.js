`use strict`;

const data = require(`./MovieData/data.json`);

const express = require(`express`);
const cors = require(`cors`);
const server = express();
server.use(cors());

server.get(`/`, handelGet)
server.get(`/favorite`, handelGetsec)
server.use(handelErrorserver)
server.get('*', handelError);
server.use(handelErrorserver)





// server.get (`/` , handelGet)

function BigMovie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}



function handelGet(request, response) {

    let obj = new BigMovie(data.title, data.poster_path, data.overview);
    return response.status(200).json(obj);
}


// ----


server.get(`/favorite`, handelGetsec)

function handelGetsec(request, response) {
    return response.status(200).send("Welcome to Favorite Page");
}



// ---***---




// server.get('*',handelError);

function handelError(request, response) {
    response.status(404).send('page not found error 404')
}




// # handel error 500


function handelErrorserver(error ,request, response) {
const err ={
    status : 500,
    message : error
}
response.status(500).send(err);
}

server.listen(3210,()=>{
    console.log("here we start in our website 3210");
})
