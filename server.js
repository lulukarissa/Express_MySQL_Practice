var express = require('express');
var route_mysql = require('./route/route_mysql')
var cors = require('cors')

var app = express();
app.use(route_mysql);
app.use(cors())

// route
app.get('/', (req, res)=>{
    res.send('<h1>Express x MySQL</h1>')
})

// aktivasi server
app.listen(3210, ()=>{
    console.log('Server aktif di port 3210!')
})