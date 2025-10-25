// User registration endpoint
// Replaces: saver/user/register.php

const { connectToDatabase } = require('../config/database');
const bcrypt = require('bcryptjs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, password, phone } = JSON.parse(event.body);

    // Validation
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email and password required' })
      };
    }

    const db = await connectToDatabase();
    
    // Check if user already exists
    const existingUser = await db.collection('client').findOne({ email });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already registered' })
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.collection('client').insertOne({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      createdAt: new Date()
    });

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Registration successful',
        userId: result.insertedId
      })
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Registration failed' })
    };
  }
};
