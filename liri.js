//variables needed to run node commands
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var request = require("request");
var axios = require("axios");
var fs = require("fs");
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

    case "concert-this":
        searchBand(searchFor);
        break;

    case "do-what-it-says":
        runCommand();
        break;

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
        console.log("\nHere is a list of songs with that name and relavant information:");
        fs.appendFileSync("log.txt", "\nHere is a list of songs with that name and relavant information: " + "\n");
        for (i = 0; i < songNames.length; i++) {
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Artist(s): " + songNames[i].artists[0].name + "\n");
            fs.appendFileSync("log.txt", "Artist(s): " + "\n");
            console.log("Song name: " + songNames[i].name);
            fs.appendFileSync("log.txt", "Song Name: " + songNames[i].name + "\n");
            console.log("To preview song: " + songNames[i].preview_url);
            fs.appendFileSync("log.txt", "To preview song: " + songNames[i].preview_url + "\n");
            console.log("Album: " + songNames[i].album.name);
            fs.appendFileSync("log.txt", "Album: " + songNames[i].album.name + "\n");
            console.log("\n");
            fs.appendFileSync("log.txt", "\n");
        }
    });
};
// function to perform movie search using axios and omdb
function searchMovie(searchFor) {

    axios.get("http://www.omdbapi.com/?t=" + searchFor + "&y=&plot=short&apikey=trilogy").then(function(response) {
        var movie = response.data;
        console.log("\nHere is the movie you requested: ");
        fs.appendFileSync("log.txt", "\nHere is the movie you requested: " + "\n");
        console.log("Title: " + movie.Title);
        fs.appendFileSync("log.txt", "Title: " + movie.Title + "\n");
        console.log("Release Year: " + movie.Year);
        fs.appendFileSync("log.txt", "Release Year: " + movie.Year + "\n");
        console.log("IMDB Rating: " + movie.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + movie.imdbRating + "\n");
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n");
        console.log("Country of Production: " + movie.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + movie.Country + "\n");
        console.log("Language: " + movie.Language);
        fs.appendFileSync("log.txt", "Language: " + movie.Language + "\n");
        console.log("Plot: " + movie.Plot);
        fs.appendFileSync("log.txt", "Plot: " + movie.Plot + "\n");
        console.log("Actors: " + movie.Actors);
        fs.appendFileSync("log.txt", "Actors: " + movie.Actors + "\n");
        console.log("\n");
        fs.appendFileSync("log.txt", "\n");
    });
}
// function to search for concerts using axios and bandsintown
function searchBand(searchFor) {
    axios.get("https://rest.bandsintown.com/artists/" + searchFor + "/events?app_id=codingbootcamp").then(function(response) {
        console.log("\nHere is the Artist you requested with relavant information on their upcoming tour(s): ");
        fs.appendFileSync("log.txt", "\nHere is the Artist you requested with relavant information on their upcoming tour(s): " + "\n");
        var band = response.data;
        for (i = 0; i < band.length; i++) {
            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Venue: " + band[i].venue.name);
            fs.appendFileSync("log.txt", "Venue: " + band[i].venue.name + "\n");
            console.log("Location: " + band[i].venue.city);
            fs.appendFileSync("log.txt", "Location: " + band[i].venue.city + "\n");
            console.log("Date of Event: " + moment(band[i].datetime).format("LLLL"));
            fs.appendFileSync("log.txt", "Date of Event: " + moment(band[i].datetime).format("LLLL") + "\n");
            console.log("\n");
            fs.appendFileSync("log.txt", "\n");
        }
    });
}
// function to run do what it says
function runCommand() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        searchSong(dataArr[1]);
    });
}