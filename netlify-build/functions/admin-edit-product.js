// Edit existing product (Admin only)
// Replaces: admin/saver/edit-product.php

const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');
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
    const { productId, name, price, brand, categorie, model, productcondition, year, image, des, weight } = productData;

    if (!productId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Product ID required' })
      };
    }

    const db = await connectToDatabase();
    
    const updateData = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (price) updateData.price = parseFloat(price);
    if (brand !== undefined) updateData.brand = brand;
    if (categorie) updateData.categorie = categorie;
    if (model !== undefined) updateData.model = model;
    if (productcondition) updateData.productcondition = productcondition;
    if (year) updateData.year = parseInt(year);
    if (image !== undefined) updateData.image = image;
    if (des !== undefined) updateData.des = des;
    if (weight !== undefined) updateData.weight = weight;

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Product updated successfully'
      })
    };

  } catch (error) {
    console.error('Error editing product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to edit product' })
    };
  }
};
