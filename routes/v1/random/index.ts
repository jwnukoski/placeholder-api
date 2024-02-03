const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    // Logic to fetch all products
    res.send('Get all products');
});

router.post('/', (req, res) => {
    // Logic to create a new product
    res.send('Create a new product');
});

// Add more routes as needed

module.exports = router;