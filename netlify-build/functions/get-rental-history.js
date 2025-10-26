// Get rental history for user or admin
// Replaces: dashboard queries and admin history

const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  try {
    // Verify token
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
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid or expired token' })
      };
    }

    const db = await connectToDatabase();
    let history;

    if (decoded.role === 'admin') {
      // Admin sees all rentals
      history = await db.collection('history')
        .aggregate([
          {
            $lookup: {
              from: 'products',
              localField: 'product_id',
              foreignField: '_id',
              as: 'product'
            }
          },
          {
            $unwind: '$product'
          },
          {
            $sort: { date: -1 }
          }
        ])
        .toArray();
    } else {
      // User sees only their rentals
      history = await db.collection('history')
        .aggregate([
          {
            $match: { user: decoded.userId }
          },
          {
            $lookup: {
              from: 'products',
              localField: 'product_id',
              foreignField: '_id',
              as: 'product'
            }
          },
          {
            $unwind: '$product'
          },
          {
            $sort: { date: -1 }
          }
        ])
        .toArray();
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(history)
    };

  } catch (error) {
    console.error('Error fetching rental history:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch rental history' })
    };
  }
};
