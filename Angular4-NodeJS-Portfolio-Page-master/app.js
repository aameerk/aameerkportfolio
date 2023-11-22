const express   = require('express'),
app             = express(),
methodOverride  = require('method-override'),
bodyParser      = require('body-parser'),
path            = require('path'),
cors            = require('cors'),
passport        = require('passport'),
config          = require('./config/database'),
mongoose        = require('mongoose');

//Routes Modules imports.
const projects = require('./routes/projects'),
users           = require('./routes/users');

mongoose.connect(config.database);

//On database connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

//On database connection error
mongoose.connection.on('error', (error) => {
    console.log('Failed to connect to database' + error);
});

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport)

//TODO: Check this
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"));

app.use('/users', users);

app.use('/projects', projects);


//TODO: Needs a /projects/new route on the front-end that redirects here:
//RESTful route: Create. Creates a new project them redirects to the Index route.

//Invalid API Endpoints:
app.get("/", (req, res) => {
    res.send("Invalid endpoint");
})


app.listen(8080, () =>  {
    console.log('Server conected on port 8080');
});


