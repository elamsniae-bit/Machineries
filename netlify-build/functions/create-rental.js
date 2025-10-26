// Create rental request
// Replaces: process.php

const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Verify user token
    const authHeader = event.headers.authorization;
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Please login to rent equipment' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    const rentalData = JSON.parse(event.body);
    const { 
      productId, 
      rec_name, 
      rec_email, 
      rec_phone, 
      rec_address, 
      postal,
      quality 
    } = rentalData;

    if (!productId || !rec_name || !rec_email || !rec_phone || !rec_address) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const db = await connectToDatabase();

    // Verify product exists
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    if (!product) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Product not found' })
      };
    }

    // Create rental history entry
    const rentalHistory = {
      product_id: new ObjectId(productId),
      user: decoded.userId,
      status: 'Pending',
      quality: quality || 'Standard',
      rec_name,
      rec_email,
      rec_phone,
      rec_address,
      postal: postal || '',
      date: new Date(),
      createdAt: new Date()
    };

    const result = await db.collection('history').insertOne(rentalHistory);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        rentalId: result.insertedId,
        message: 'Rental request submitted successfully'
      })
    };

  } catch (error) {
    console.error('Error creating rental:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create rental request' })
    };
  }
};
