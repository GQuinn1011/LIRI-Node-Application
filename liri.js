//variables needed to run node commands
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var request = require("request");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var typeRequest = process.argv[2];
var searchFor = process.argv[3];

// to run command line request
switch (typeRequest) {
    case "spotify-this-song":
        searchSong(searchFor);
        break;

    case "movie-this":
        searchMovie(searchFor);
        break;

        // case "concert-this":
        //     searchBand(searchFor);
        //     break;

        // case "do-what-it-says":
        //     runCommand();
        //     break;

}

// function to perform spotify search
function searchSong(searchFor) {
    if (searchFor === undefined) {
        search = "The Sign";
    }
    spotify.search({
        type: 'track',
        query: searchFor
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songNames = data.tracks.items;
        for (i = 0; i < songNames.length; i++) {
            console.log("\nHere are a list of songs by that name with relavant in formation:");
            console.log(i);
            console.log("Artist(s): " + songNames[i].artists[0].name);
            console.log("Song name: " + songNames[i].name);
            console.log("To preview song: " + songNames[i].preview_url);
            console.log("Album: " + songNames[i].album.name);
            console.log("\n");
        }
    });
};
// function to perform movie search using axios and omdb
function searchMovie(searchFor) {
    if (searchFor === undefined) {
        searchFor = "Mr. Nobody"
        console.log("\nSince you didn't put a movie name in, I thought you might like 'Mr. Nobody'");
        console.log(" If you haven't watched it then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Amazon Prime Video!");
    }
    axios.get("http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy").then(function(response) {
        var movie = response.data;
        console.log("\nHere is the movie you requested:");
        console.log("Title: " + movie.Title);
        console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        console.log("Country of Production: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
        console.log("\n");
    });

}