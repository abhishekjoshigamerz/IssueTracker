const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const port = 80;
const app = express();
const db = require('./config/connection');
const path = require('path');

app.use(express.urlencoded());



app.use(expressLayouts);
app.use(express.static('./assets/'));



app.set('layout extractStyles',true);
// app.use(express.static('assets'));
app.set('layout extractScripts',true);

// app.use('/assets', express.static(path.join(__dirname, 'assets')))
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