const express = require('express');
const dotenv = require("dotenv").config();
const extractRoute = require('./routes/extractRoute')

const app = express();
const email = require('node-email-extractor').default;
const fs = require('fs').promises;  
const path = require('path'); 
app.use(express.json())
// app.use('/api/extract', extractRoute)

var cors = require('cors')



app.use(cors (
  // {origin:`http://13.40.31.32:${process.env.PORT_FRONTEND}`,
  {origin:process.env.React_ORIGIN,
    credentials:true,
  }
  ))
  
  app.use((_req, res, next) => {
    // res.header('Access-Control-Allow-Origin',`*`);
    res.header('Access-Control-Allow-Origin',`${process.env.React_ORIGIN}`);
    res.header('Access-Control-Allow-Headers', '*');
    
    next();
  });


  
  app.use('/api', extractRoute)
  app.get('/', function(req,res){
    res.json("Hello")
  })

const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server runnning on ${port}`))