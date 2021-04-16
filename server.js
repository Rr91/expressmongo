
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');


var app = express();
var db;

app.use(bodyParser.json());
app.use( bodyParser.urlencoded( {extended:true} ));


var artists= [
	{
		id:1,
		name:'Люмен'
	},
	{
		id:2,
		name:'ГРоБ'
	},
	{
		id:3,
		name:'БИ2'
	}
]


app.get('/', function(req, res){
	res.send('Hello Api');
});
app.get('/artists', function(req, res){
	db.collection('artists').find().toArray(function(err, docs){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(docs);
	});
});
app.get('/artists/:id', function(req, res){
	db.collection('artists').findOne({_id: ObjectID(req.params.id) }, function(err, doc){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(doc);
	});
});

app.post('/artists', function(req, res){
	var artist = {
		name: req.body.name,
	};
	db.collection('artists').insert(artist, function(err, result){
		if(err){
			console.log(err);
			return res.sendStatus(500);
		}
		res.send(artist);
	});
});





// MongoClient.connect('mongodb::/localhost:27017/myapi', function(err, database){
// 	if(err){
// 		return console.log(err);
// 	}
// 	db = database;
// 	app.listen(3012, function(){
// 		console.log('API app start')
// 	});

// });

mongoose.connect("mongodb://localhost:27017/myapi", { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('ok');
  	app.listen(3012, function(){
		console.log('API app start')
	});
});


