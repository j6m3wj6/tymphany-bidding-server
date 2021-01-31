
// import mongoose from 'mongoose';
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ProductSchema = new Schema(
  {
    id: Number,
    brand: String,
    module: String,
    color: String,
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("SealedProducts", ProductSchema);
// const SealedProducts = mongoose.model("SealedProducts", ProductSchema);
// export default SealedProducts;