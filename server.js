// import mongoose from 'mongoose' 

// create an express app
const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
console.log(uri)
// const uri = "mongodb+srv://j6m3wj6:0000@cluster0.gnphr.mongodb.net/Tymphany-Bidding?retryWrites=true&w=majority";
// const process.env.MONGO_URL = "mongodb+srv://j6m3wj6:0000@cluster0.gnphr.mongodb.net/Tymphany-Bidding?retryWrites=true&w=majority";

// use the express-static middleware
app.use(express.static("public"));
app.get('/', async function (req, res) {
  console.log('/')
  res.status(200).send({message: "Hello, World!"})
})
app.get('/test', async function (req, res) {
  console.log('/test')
  res.status(200).send({message: "success"})
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));