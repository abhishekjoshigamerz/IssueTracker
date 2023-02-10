const mongoose = require('mongoose'); 
console.log(process.env.MONGO_URL);
 
mongoose.connect("mongodb://localhost/issuetracker");
 
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;