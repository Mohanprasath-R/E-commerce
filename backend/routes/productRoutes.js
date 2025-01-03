const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload multiple images
router.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, description, category, seller, stock } = req.body;
    const images = req.files.map((file) => ({
      image: `/uploads/${file.filename}`,
    }));

    const product = new Product({
      name,
      price,
      description,
      images,
      category,
      seller,
      stock,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
});

module.exports = router;
