const express = require('express'),
  morgan = require('morgan');

const app = express();

let favMovies = [
  {
    title: 'Memento',
    director: 'Christopher Nolan'
  },
  {
    title: 'Star Wars',
    director: 'George Lucas'
  },
  {
    title: 'Tangled',
    director: 'Nathan Greno & Byron Howard'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'Castle in the Sky',
    director: 'Hayao Miyazaki'
  },
  {
    title: 'Jurassic Park',
    director: 'Steven Spielberg'
  },
  {
    title: 'Mission Impossible - Ghost Protocol',
    director: 'Brad Bird'
  },
  {
    title: 'Rocky',
    director: 'John G. Avildsen'
  },
  {
    title: 'Lord of the Rings',
    director: 'Peter Jackson'
  },
  {
    title: 'The Blues Brothers',
    director: 'John Landis'
  }
];

app.use(morgan('common'));

app.use(express.static('public'));


// GET Requests
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(favMovies);
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});