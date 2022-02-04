`use strict`;

// const data = require(`./MovieData/data.json`);
require('dotenv').config();
const express = require(`express`);
const cors = require(`cors`);
const axios = require('axios');

const PORT = process.env.PORT;




const server = express();
server.use(cors());

server.get(`/`, handelGet)
server.get(`/favorite`, handelGetsec)

server.get(`/trending`, handelTrend);
server.get(`/search`, handelSearching);

server.get(`/movieToprated`, handelmovieToprate);    //  new route

server.get(`/discover`, handeldiscover);    //  new route

server.use('*', handelError);
server.use(handelErrorserver);


let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`;


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


// server.get(`/favorite`, handelGetsec)

function handelGetsec(request, response) {
    return response.status(200).send("Welcome to Favorite Page");
}



// ---***---

// server.get (`/trending` , handelTrend);

function BigMovietrend(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}


function handelTrend(request, response) {

    let dattaArr = [];

    axios.get(url).then((datta) => {
        // console.log(datta);
        datta.data.results.forEach(data => {
            dattaArr.push(new BigMovietrend(data.id, data.title, data.release_date, data.poster_path, data.overview));
        });
        response.status(200).json(dattaArr);
    }).catch((err) => {
        handelErrorserver(err, request, response);
    });
}


// ----
// server.get (`/search` , handelSearching);

function handelSearching(request, response) {

    let searchArr = [];
    let search = "The";
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${search}`;
    axios.get(url).then((datta) => {
        // console.log(datta)
        datta.data.results.forEach(data => {
            searchArr.push(new BigMovietrend(data.id, data.title, data.release_date, data.poster_path, data.overview));
        });
        response.status(200).json(searchArr);
    }).catch((err) => {
        handelErrorserver(err, request, response);
    });


}


// -----*****-------


// server.get(`/movieToprated`, handelmovieToprate);  

function handelmovieToprate(request, response) {        // new route

    let movTop = [];

    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.APIKEY}&language=en-US`;
    axios.get(url).then((datta) => {
        // console.log(datta);
        datta.data.results.forEach(data => {

            movTop.push(new BigMovietrend(data.id, data.title, data.release_date, data.poster_path, data.overview));
        });
        response.status(200).json(movTop);
    }).catch((err) => {
        handelErrorserver(err, request, response);
    });
}


// server.get(`/discover`, handeldiscover); 

function handeldiscover(request, response) {           // new route
    let discover = [];

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.APIKEY}&language=en-US`;

    axios.get(url).then((datta) => {
        datta.data.results.forEach(data => {

            discover.push(new BigMovietrend(data.id, data.title, data.release_date, data.poster_path, data.overview));
        });
        response.status(200).json(discover);

    }).catch((err) => {
        handelErrorserver(err, request, response);
    });

}


// server.get('*',handelError);

function handelError(request, response) {
    response.status(404).send("page not found error 404")
}




// # handel error 500


function handelErrorserver(error, request, response) {
    const err = {
        status: 500,
        message: error
    }
    response.status(500).send(err);
}


server.listen(PORT, () => {
    console.log(`here we start in our website ${PORT}`)
})
