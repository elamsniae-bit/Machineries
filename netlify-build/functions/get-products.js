// Get products with optional category filter
// Replaces: products.php database queries

const { connectToDatabase } = require('../config/database');

exports.handler = async (event, context) => {
  try {
    const { category } = event.queryStringParameters || {};
    
    const db = await connectToDatabase();
    
    // Build query
    let query = {};
    if (category) {
      // Decode base64 category name (matching PHP version)
      const decodedCategory = Buffer.from(category, 'base64').toString('utf-8');
      query.categorie = decodedCategory;
    }

    const products = await db.collection('products')
      .find(query)
      .toArray();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(products)
    };

  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch products' })
    };
  }
};
