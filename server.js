const data = require('./data.json')

const mongoose = require('mongoose');
const Product = require('./product.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors =require('cors');

const corsOptions = {
  origin: ['https://j6m3wj6.github.io/tymphany-bidding-demo/', 'https://j6m3wj6.github.io/', 'http://localhost:3000','http://127.0.0.1:3000'],
  credentials: true,
}
process.env.MONGO_URL = "mongodb+srv://j6m3wj6:0000@cluster0.gnphr.mongodb.net/Tymphany-Bidding?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI;

const app = express();
app.use(cors(corsOptions))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE, GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

// console.log(data)
const saveSample = () => {
  Product.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Remove all data`); 
  });
  data.forEach(_data => {
    const _product = new Product(_data)
    _product.save((err) => {
      if (err) {
        console.log(err);
      }
      console.log(`data ${_product.brand}-${_product.module} saved!!!`); 
    });
  });
}

// saveSample();

app.get('/', async function (req, res) {
  console.log('/', req.body)
  res.status(200).send({message: "Hello, World!"})
})
app.get('/api/bidding', async function (req, res) {
  console.log('GET /api/bidding')
  // var awesome_instance = new Product({ brand: 'testBrand', module: 'testModule', color: 'testColor' });
  // awesome_instance.save(function (err) {
  //   if (err) return handleError(err);
  //   // saved!
  // });
  await Product.find((err, data) => {
    if (err) return res.json({ success: false, content: err });
    return res.json({ success: true, content: data });
  });
  // Product.
  //     find().
  //     where('sport').equals('Tennis').
  //     where('age').gt(17).lt(50).  //Additional where query
  //     limit(5).
  //     sort({ age: -1 }).
  //     select('name age').
  //     exec(function (err, data) {
  //       if (err) return res.json({ success: false, error: err });
  //       console.log('The data is %s', data);
  //     });

})


app.post('/api/bidding/seals', async function (req, res) {
  console.log('POST /api/bidding')
  // console.log(req);
  
  const product = new Product(req.body);
  //使用countDocuments檢查是否db裡已經有資料，避免重複
  product.save((err) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err });
    }
    console.log(`data ${product.brand}-${product.module} saved!!!`); 
    res.json({ success: true, message: `data ${product.brand}-${product.module}  saved!!!` });
  });
})

app.delete('/api/bidding', async function (req, res) {
  console.log('DELETE All /api/bidding')
  Product.remove({}, (err) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err });
    }
    console.log(`Remove all data`); 
    res.json({ success: true, message: `Remove all data` });
  });
})

app.put('/api/bidding', async function (req, res) {
  console.log('Update')
  Product.findOneAndUpdate(
    { _no: req.body._no }, 
    { $push: req.body.updateContent}, 
    (err) => {
    if (err) {
      console.log(err);
      res.json({ success: false, message: err });
    }
    // console.log(`data ${product.brand}-${product.module} saved!!!`); 
    res.json({ success: true, message: `data updated!!!` });
  })
})


// const product = new Product({ brand: 'testBrand', module: 'testModule', color: 'testColor' });
// //使用countDocuments檢查是否db裡已經有資料，避免重複

// Product.countDocuments(product.brand, (err, count) => {
//   if (count) {
//     console.log(`data ${product.brand} exists!!`);
//     res.json({ success: false, message: `data ${product.brand} exists!!` });
//   }
//   else {
    
//     product.save((err) => {
//       if (err) console.error(err);
//       return res.json({ success: true, message: `data ${product.brand} saved!!!` });
//       console.log(`data ${product.brand} saved!!!`); 
//     });
//   }
// });