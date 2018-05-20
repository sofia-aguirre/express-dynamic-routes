// server.js
// SERVER-SIDE JAVASCRIPT

//require express in our app
const express = require('express');
//require body-parser
const bodyParser = require('body-parser');
// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static('public'));
//including body parser
app.use(bodyParser.urlencoded({ extended: false }));

const albums = [
  {
    title: 'Cupid Deluxe',
    artist: 'Blood Orange'
  },
  {
    title: 'M3LL155X - EP',
    artist: 'FKA twigs'
  },
  {
    title: 'Fake History',
    artist: 'letlive.'
  }
];


// Allow CORS: we'll use this today to reduce security so we can more easily test our code in the browser.
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// define a root route: localhost:3000/
app.get('/',  (req, res) => {
  // send the text 'Hello World!' when someone visits localhost:3000/
  console.log('req = ', req);
  console.log('res = ', res);

  //res.send('Hello World!');
  res.sendFile('views/index.html' , { root : __dirname});
});

app.get('/api/albums', (req,res) => res.json(albums) );

app.post('/api/albums', (request, response) => {
  let name = request.body.name;
  let artist = request.body.artist;
  let newAlbum = { title: name, artist: artist };
  albums.push(newAlbum);
  response.json(albums);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening at http://localhost:3000/')
});
