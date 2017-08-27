// const MongoClient = require('mongodb').MongoClient;

//This is called object desctructuring
//IT's Identical to the code above
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Error connecting to DB");
	}
	console.log("Connected to MongoDB Server");


	//Find the first one and Updates it
	//FindoneandUpdate(filter, update, options, callback)
	db.collection('Todos')
	.findOneAndUpdate({
		text: 'something to do'
	}, {
		//This is the update
		$set: {
			text:'I DID THIS THING'
		}
	}, {
		//This is the options
		returnOriginal: false
	})
	.then((result) => {
			console.log(result);
	});
	db.close();
});
