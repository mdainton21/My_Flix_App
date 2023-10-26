const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Boris",
        favoriteMovies: []
    },
]

let movies = [
    {
        "Title": "Inception",
        "Description": "Dreams, Heists, and Twists oh my",
        "Genre": {
            "Name": "Action",
            "Description": "Movies built around fighting, combat or, you know, Action!"
        },
        "Director": {
            "Name": "Christopher Nolan",
            "Bio": "Nolan Bio",
            "Birth": 1970
        },
        "imageURL": "filler",
        "Featured": false
    },

];

// CREATE

// Create New User
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

// Add Favorite Movie
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user')
    }
})


// READ

// Get ALL movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// Get a specific movie by title
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }

})

// Get a specific genre and description
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }

})

// Get a specific director and bio
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }

})


// UPDATE

// Allows a user to change their username
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})


// DELETE

// Remove a favorite movie
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send('no such movie')
    }
})

// Remove a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`user's ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

app.listen(8080, () => console.log("listening on 8080"))