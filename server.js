const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//this is the port that can be used in for heroku if port doesnt exist then it will just be in port 3000
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view egine', 'hbs');

//app.use is how you register middleware
app.use((req, res, next) => {
	var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n', (err)=>{
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});

/*this will stop the rest from rendering and it will only render this middleware*/
// app.use((req, res, next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));





//handlebars helpers to dynamically update a website 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome To my Website'
    });
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    // 	name: 'Jose',
    // 	likes: [
    // 		'biking',
    // 		'cities'
    // 	]
    // });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
    // res.send('About Page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle Request'
    });


});

app.listen(port, () => {

    console.log('Server is up on port 3000');

});