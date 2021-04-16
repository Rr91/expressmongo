
var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');


var app = express();
var db;

app.use(bodyParser.json());
app.use( bodyParser.urlencoded( {extended:true} ));


app.get('/', function(req, res){
	res.send('<a href="/partii">All partii</a><br><form action="/partii" method="POST"><input type="text" name="name" value=""/><button>add new</button><form>');
});

app.get('/partii', function(req, res){
	db.collection('partii').find().toArray(function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});
app.get('/partii/:id', function(req, res){
	db.collection('partii').findOne({_id: ObjectID(req.params.id) }, function(err, doc){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	});
});

app.post('/partii', function(req, res){
	var parti = {
		name: req.body.name,
	};
	db.collection('partii').insertOne(parti, function(err, result){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(parti);
	});
});


mongoose.connect("mongodb://localhost:27017/myapi", { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('ok');
  	app.listen(3012, function(){
		console.log('API app start')
	});
});


