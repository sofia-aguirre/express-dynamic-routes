//requirements
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//hardcoded data
let hamburgers = [
    {name: "chezburgr"},
    {name: "guacburgr"},
    {name: "vegiburgr"}
]

let tacos = [
    {name: "soft taco"},
    {name: "crunchy taco"},
    {name: "burrito (not a taco)"}
]

let cities = [
    {name: "Seattle", description: "The Emerald City"},
    {name: "San Francisco", description: "The Golden City"}
]

//middleware

//make a public folder available to my frontend html
app.use(express.static('public'));

//Routes

//GET/
app.get('/', (req, res) => {
    //any code above res.send will not be executes
    //res.send is like a return for a function
    res.send("Your app is working!");
    //any code below res.send will not be executes
})

//GET /api/hamburgera
app.get('/api/hamburgers', (req, res) => {
    //any code above res.send will not be executes
    //res.send is like a return for a function
    res.json({hamburgers});
    //any code below res.send will not be executes
})

//GET /api/tacos GET ALL aka index route /api/whatever
app.get('/api/tacos', (req, res) => {
    //any code above res.send will not be executes
    //res.send is like a return for a function
    res.json({tacos});
    //any code below res.send will not be executes
})

//GET /api/tacos:index GET ONE SHOW
app.get('/api/tacos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json({tacoObjectName: tacos[id]});
})

//route with a parameterized :whatever
app.get("/greetings/:age/:name", (request, response) => {
    response.send(request.params);
});

//get /pick-a-color/orange
app.get("/pick-a-color/:color", (request, response) => {
    response.send("You picked the color: " + request.params.color);
});

//this query gets
//get /thank?name=sofia&age=30 => "Thanks, Sofia!"
app.get("/thank", (request, response) => {
    console.log(request.query);
    let name = request.query.name;
    let age = request.query.age;
    response.send('Thank you, ' + name + " of age " + age + '!');
});

//this query gets
//get /multiply?x=14&y=0 => "The product of x * y = 0."
app.get("/multiply", (request, response) => {
    console.log(request.query);
    let x = request.query.x;
    let y = request.query.y;
    let product = parseInt(x * y);
    response.send('The product of ' + x + " and "+ y + ' = ' + product);
});

//POST lesson
app.post('/api/cities', (request, response) => {
    let name = request.body.name;
    let desc = request.body.description;
    let newCity = { name: name, description: desc };
    // if we have a cities array in our app (pre-database):
    cities.push(newCity);
    response.json(cities);
  });




//server code
app.listen(3000, () => console.log("HEY server started @ port 3000"));




//NOTES
//GET ALL aka index route /api/whatever, req type GET
//GET ONE aka show route /api/whatever/id, req type GET
//CREATE aka create route /api/whatever, req type POST