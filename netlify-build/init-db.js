const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

async function initDatabase() {
  console.log('🔌 Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('heavyequip');
    
    const categoriesCount = await db.collection('categories').countDocuments();
    if (categoriesCount === 0) {
      console.log('📦 Initializing categories...');
      await db.collection('categories').insertMany([
        { name: 'Excavators' },
        { name: 'Bulldozers' },
        { name: 'Cranes' },
        { name: 'Loaders' },
        { name: 'Compactors' }
      ]);
      console.log('✅ Categories created');
    } else {
      console.log('✅ Categories already exist');
    }
    
    const adminCount = await db.collection('admin').countDocuments();
    if (adminCount === 0) {
      console.log('👤 Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.collection('admin').insertOne({
        username: 'admin',
        email: 'admin@heavyequip.com',
        password: hashedPassword
      });
      console.log('✅ Admin user created (username: admin, password: admin123)');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    const productsCount = await db.collection('products').countDocuments();
    if (productsCount === 0) {
      console.log('🚜 Adding sample products...');
      await db.collection('products').insertMany([
        {
          name: 'CAT 320 Excavator',
          price: 450,
          brand: 'Caterpillar',
          categorie: 'Excavators',
          model: '320',
          productcondition: 'Excellent',
          year: 2023,
          image: '3RN4F45b.png',
          des: 'Heavy-duty excavator for large construction projects',
          weight: '20 tons'
        },
        {
          name: 'John Deere 850K Bulldozer',
          price: 550,
          brand: 'John Deere',
          categorie: 'Bulldozers',
          model: '850K',
          productcondition: 'Excellent',
          year: 2022,
          image: 'CYTF9C9.jpg',
          des: 'Powerful bulldozer with advanced blade control',
          weight: '25 tons'
        },
        {
          name: 'Liebherr LTM 1100 Crane',
          price: 800,
          brand: 'Liebherr',
          categorie: 'Cranes',
          model: 'LTM 1100',
          productcondition: 'Good',
          year: 2021,
          image: 'LETT9QN.jpg',
          des: 'Mobile crane with 100-ton capacity',
          weight: '48 tons'
        }
      ]);
      console.log('✅ Sample products added');
    } else {
      console.log('✅ Products already exist');
    }
    
    console.log('\n🎉 Database initialization complete!\n');
    console.log('📊 Database Summary:');
    console.log(`   - Categories: ${await db.collection('categories').countDocuments()}`);
    console.log(`   - Admin Users: ${await db.collection('admin').countDocuments()}`);
    console.log(`   - Products: ${await db.collection('products').countDocuments()}`);
    console.log(`   - Clients: ${await db.collection('client').countDocuments()}`);
    console.log('\n🔐 Admin Login:');
    console.log('   Username: admin');
    console.log('   Password: admin123\n');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initDatabase();
