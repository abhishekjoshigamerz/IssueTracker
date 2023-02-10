const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const app = express();
const db = require('./config/connection');

app.use(express.urlencoded());
app.use(expressLayouts);

app.set('extractScripts',true);
//write code for ejs as template engine here
app.set('view engine','ejs');
app.set('views','./views');





app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`App has encounter a error ${err}`);
        return;
    }
    console.log(`App is running successfully on http://localhost:8000`);
});