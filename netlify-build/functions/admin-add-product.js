// Add new product (Admin only)
// Replaces: admin/saver/add-product.php

const { connectToDatabase } = require('../config/database');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Verify admin token
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        throw new Error('Not admin');
      }
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    const productData = JSON.parse(event.body);
    const { name, price, brand, categorie, model, productcondition, year, image, des, weight } = productData;

    if (!name || !price || !categorie) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const db = await connectToDatabase();
    
    const newProduct = {
      name,
      price: parseFloat(price),
      brand: brand || '',
      categorie,
      model: model || '',
      productcondition: productcondition || 'Good',
      year: year ? parseInt(year) : new Date().getFullYear(),
      image: image || '',
      des: des || '',
      weight: weight || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('products').insertOne(newProduct);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        productId: result.insertedId,
        message: 'Product added successfully'
      })
    };

  } catch (error) {
    console.error('Error adding product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add product' })
    };
  }
};
