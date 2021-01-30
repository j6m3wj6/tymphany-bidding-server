// import mongoose from 'mongoose' 

// create an express app
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
const app = express();

process.env.MONGO_URL = "mongodb+srv://j6m3wj6:0000@cluster0.gnphr.mongodb.net/Tymphany-Bidding?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;


// use the express-static middleware
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log('DB connected!!!')
    //routes(app)
    // app.use('/api/bidding', biddingRoutes)
    // start listening
    app.listen(process.env.PORT || 3000, 
      () => console.log(`Server is running at ${process.env.PORT} || 3000 \n
      uri = ${uri}`));
})

app.get('/', async function (req, res) {
  console.log('/', req.body)
  res.status(200).send({message: "Hello, World!"})
})
app.get('/test', async function (req, res) {
  console.log('/test')
  res.status(200).send({message: "success"})
})

// start the server listening for requests
// app.listen(process.env.PORT || 3000, 
//   () => console.log(`Server is running at ${process.env.PORT} || 3000 \n
//   uri = ${uri}`));