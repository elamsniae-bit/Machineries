// Admin login endpoint
// Replaces: saver/admin/admin.php

const { connectToDatabase } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username and password required' })
      };
    }

    const db = await connectToDatabase();
    const admin = await db.collection('admin').findOne({ username });

    if (!admin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const isValid = await bcrypt.compare(password, admin.password);
    
    if (!isValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const token = jwt.sign(
      { adminId: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        }
      })
    };

  } catch (error) {
    console.error('Admin login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Login failed' })
    };
  }
};
