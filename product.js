
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ProductSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
// module.exports = mongoose.model("Product", ProductSchema);
export default mongoose.model("Product", ProductSchema);