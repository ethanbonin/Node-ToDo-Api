// const MongoClient = require('mongodb').MongoClient;

//This is called object desctructuring
//IT's Identical to the code above
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log("Error connecting to DB");
	}
	console.log("Connected to MongoDB Server");

	//
	// db.collection('AnotherDoc').insertOne({
	// 	text: "something to do",
	// 	completed: false
	// }, (err, result) => {
	// 		if (err) {
	// 			return console.log("unable to insert todo", err);
	// 		}
	// 		console.log(JSON.stringify(result.ops));
	// });
	//
	//
	// db.collection('Users').insertOne({
	// 	name: "something to do",
	// 	age: false,
	// 	location: "Denver",
	// }, (err, result) => {
	// 		if (err) {
	// 			return console.log("unable to insert user", err);
	// 		}
	// 		console.log(JSON.stringify(result.ops));
	// });


	db.close();
});
