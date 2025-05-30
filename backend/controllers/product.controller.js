import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ data: products });
    } catch(error) {
        console.error("error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const createProducts = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch(error) {
        console.error("error in creating product: ", error.message);
        res.status(500).json({success:false, message: "Internal server error"});
    }
} 

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product found...(id)"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch(error) {
        console.error("error in updating product: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product found...(id)"});
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"})
    } catch(error) {
        console.log("error in deleting product: ", error.message);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}