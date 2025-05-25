import express from "express";

import { createProducts, deleteProducts, getProducts, updateProducts } from "../controllers/product.controller.js";

const router = express.Router();

//CRUD operations
router.post('/', createProducts);//C
router.get('/', getProducts);//R
router.put('/:id', updateProducts);//U
router.delete('/:id', deleteProducts);//D

export default router;

