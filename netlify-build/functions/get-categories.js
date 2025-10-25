// Serverless function to get all equipment categories
// Replaces: SELECT * FROM categories (from nav.php)

const { connectToDatabase } = require('../config/database');

exports.handler = async (event, context) => {
  try {
    const db = await connectToDatabase();
    const categories = await db.collection('categories').find({}).toArray();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(categories)
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch categories' })
    };
  }
};
