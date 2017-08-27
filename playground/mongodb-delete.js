// const MongoClient = require('mongodb').MongoClient;

//This is called object desctructuring
//IT's Identical to the code above
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Error connecting to DB");
	}
	console.log("Connected to MongoDB Server");

	//Deletes Many Objects
	db.collection('User').deleteMany({name: 'something to do'}).then((result) => {
		console.log(result);
	});

	//Delete one object that has the same properity as Many
	db.collection('User').deleteOne({name: 'something to do'}).then((result) => {
		console.log(result);
	});

	//Find the first one and deletes it
	db.collection('User').findOneAndDelete({name: 'something to do'}).then((result) => {
			console.log(result);
	});



	db.close();
});
