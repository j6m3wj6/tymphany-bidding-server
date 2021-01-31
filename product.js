
// import mongoose from 'mongoose';
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ProductSchema = new Schema(
  {
    _no: String,
    brand: String,
    module: String,
    color: String,
    type: String,
    // imgUrl: String
    // pcs: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("SealedProducts", ProductSchema);