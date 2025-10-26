// Add/Edit/Delete categories (Admin only)
// Replaces: admin category management

const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
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

    const db = await connectToDatabase();

    // Handle different HTTP methods
    if (event.httpMethod === 'GET') {
      // Get all categories
      const categories = await db.collection('categories').find({}).toArray();
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(categories)
      };
    }

    if (event.httpMethod === 'POST') {
      // Add new category
      const { name } = JSON.parse(event.body);
      if (!name) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Category name required' })
        };
      }

      // Check if category already exists
      const existing = await db.collection('categories').findOne({ name });
      if (existing) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Category already exists' })
        };
      }

      const result = await db.collection('categories').insertOne({ name, createdAt: new Date() });
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: true,
          categoryId: result.insertedId,
          message: 'Category added successfully'
        })
      };
    }

    if (event.httpMethod === 'PUT') {
      // Update category
      const { categoryId, name } = JSON.parse(event.body);
      if (!categoryId || !name) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Category ID and name required' })
        };
      }

      const result = await db.collection('categories').updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: { name, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Category not found' })
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
          message: 'Category updated successfully'
        })
      };
    }

    if (event.httpMethod === 'DELETE') {
      // Delete category
      const { categoryId } = JSON.parse(event.body);
      if (!categoryId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Category ID required' })
        };
      }

      const result = await db.collection('categories').deleteOne({ _id: new ObjectId(categoryId) });

      if (result.deletedCount === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Category not found' })
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
          message: 'Category deleted successfully'
        })
      };
    }

    return { statusCode: 405, body: 'Method Not Allowed' };

  } catch (error) {
    console.error('Error managing categories:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to manage categories' })
    };
  }
};
