const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
            if (!products) throw error('no products');
            res.status(200).json(products);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
});

//GET ONE PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) throw error("Article no found");
        res.status(200).json(product);
    } catch(err) {
        res.status(400).json({msg: err.message});
    }
})


router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

router.delete('/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});


module.exports = router;