import mongoose from "mongoose";
const Category = mongoose.model("Category");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    stock: Number,
    category: {
        type: Schema.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;