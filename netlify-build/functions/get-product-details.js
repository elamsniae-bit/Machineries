// Get single product details
// Replaces: view.php

const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
  try {
    const { productId } = event.queryStringParameters || {};

    if (!productId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Product ID required' })
      };
    }

    // Handle base64 encoded ID (matching PHP version)
    let decodedId = productId;
    try {
      decodedId = Buffer.from(productId, 'base64').toString('utf-8');
    } catch (e) {
      // If not base64, use as is
    }

    const db = await connectToDatabase();
    const product = await db.collection('products').findOne({ _id: new ObjectId(decodedId) });

    if (!product) {
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
      body: JSON.stringify(product)
    };

  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch product details' })
    };
  }
};
