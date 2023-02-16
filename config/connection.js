const mongoose = require('mongoose'); 

// Database connection
let dbName = process.env.DB_NAME || 'issuetracker'; 
mongoose.connect(`mongodb://localhost/${dbName}`);
 
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// Exporting the database connection
module.exports = db;