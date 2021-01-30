import mongoose from 'mongoose'
import Product from './product.js'

import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const corsOptions = {
  origin: ['https://j6m3wj6.github.io/react-gh-pages-demo/', 'http://localhost:3000','http://127.0.0.1:3000'],
  credentials: true,
}

process.env.MONGO_URL = "mongodb+srv://j6m3wj6:0000@cluster0.gnphr.mongodb.net/Tymphany-Bidding?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;

// use the express-static middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors(corsOptions))
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
      uri = ${process.env.MONGO_URL}`));
})

app.get('/', async function (req, res) {
  console.log('/', req.body)
  res.status(200).send({message: "Hello, World!"})
})
app.get('/api/bidding', async function (req, res) {
  console.log('/test')
  Product.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
})
