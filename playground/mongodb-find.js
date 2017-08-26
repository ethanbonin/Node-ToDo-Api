// const MongoClient = require('mongodb').MongoClient;

//This is called object desctructuring
//IT's Identical to the code above
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Error connecting to DB");
	}
	console.log("Connected to MongoDB Server");


	db.collection('Todos').find().toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log("Unable to fetch todos", err);
	});

	db.close();
});
