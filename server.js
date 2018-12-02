const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials('./views/partials');
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.set('view engine', 'hbs');

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\r\n', (err) => {
        if (err) {
        console.log('Error in updating log file!');
        }
    });
    next();
});

/*app.use((req, res, next)=> {
    res.render('maintenance.hbs');
});*/

app.use(express.static('public'));



app.get('/about', (req, res) => {
    res.render('about.hbs', {
       pageTitle: 'About page'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
       pageTitle: 'Home page',
       welcomeMessage: "Welcome! You are visiting our homepage, enjoy!"
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
       welcomeMessage: "Welcome! This is our portfolio page :)",
       pageTitle: 'Projects page'
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request!"
    });
});

app.listen(port, ()=> {
    console.log(`Server started on port ${port}`);
});