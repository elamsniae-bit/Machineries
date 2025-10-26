// Approve or reject rental request (Admin only)
// Replaces: admin approve functionality

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

    const { rentalId, status } = JSON.parse(event.body);

    if (!rentalId || !status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Rental ID and status required' })
      };
    }

    if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid status' })
      };
    }

    const db = await connectToDatabase();

    const result = await db.collection('history').updateOne(
      { _id: new ObjectId(rentalId) },
      { 
        $set: { 
          status,
          updatedAt: new Date(),
          updatedBy: decoded.adminId
        } 
      }
    );

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Rental request not found' })
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
        message: `Rental request ${status.toLowerCase()} successfully`
      })
    };

  } catch (error) {
    console.error('Error approving rental:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update rental status' })
    };
  }
};
