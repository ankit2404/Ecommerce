import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js'


// desc : fetch all product
// route : Get /api/product
// access : public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })

// desc : fetch product of given id
// route : Get /api/product:id
// access : public

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })

export {getProducts,getProductById}