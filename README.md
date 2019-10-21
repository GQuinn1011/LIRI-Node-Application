# LIRI-Node-Application

## Introduction

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

Click here for a video demo of the working app: https://drive.google.com/open?id=1QIMICm5H9iju7S75PKIlE765y9-9iEml


### Getting Started

* Clone the Repository
* Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and won't be commited to Github.
```
.env file 
node_modules
.DS_Store
```
* Create your own .env file in that file type the following:
  * "# Spotify API Keys" (without quotes)
  * SPOTIFY_ID=your-spotify-ID-here
  * SPOTIFY_SECRET=your-spotify-secret-here
* After you've completed the above steps you then have to install the following node modules in the command line in terminal/bash:
```
npm install <package name>
  * node-spotify-api
  * axios
  * moment
  * dotenv
```

### List of Features/Functions

* node liri.js spotify-this-song <song name> 
  * This will show you a list of songs based on your search and will also show you:
    * Artist(s) name(s)
    * Song Name
    * Song Preview Link
    * Album Name
  
* node liri.js movie-this <movie name>
  * This will show you:
    * Title of the Movie
    * Year the Movie came out
    * iMDb Rating of the Movie
    * Rotten Tomatoes Rating of the Movie
    * Country where the Movie was produced
    * Language of the Movie
    * Plot of the Movie
    * Actors in the Movie
  
* node liri.js concert-this <artist/band>
  * This will show you a list of upcoming tours/concerts, along with:
    * Name of the Venue
    * Location of the Venue
    * Date of the Event
    
* node liri.js do-what-it-says
  * This will pull the information in the random.txt file and run a spotify-this-song search. You can update the random.txt to have it run movie-this or concert-this if you like.
  
  ### Built With
  
1. javascript
1. node.js
1. Spotify API
1. Axios (for oMDb API & bandsintown API)
1. https://www.npmjs.com/ 
  
