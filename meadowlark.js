var express = require('express');
var app = express();

var handlebars = require('express-handlebars')
    .create({ defaultLayout:'main' });

var fortune = require('./lib/fortune.js');


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
    
app.set('port', process.env.PORT || 3000);


app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
	req.query.test == '1';
    next();
});
	
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('home');
});

app.get('/about', function(req,res){
    res.render('about', {fortune: fortune.getFortune()});
    pageTestScript: '/qa/tests-about.js'
});

app.use(function(req,res){
    res.status('404');
    res.render('404');
});

app.use(function(err, req,res, next){
    console.err(err.stack);
    res.status('500');
    res.render('500');    
});

app.listen(app.get('port'), function(){
    console.log('Express has started on http://localhost:' +
		app.get('port') + '; Press Ctl-C to terminate')
});
