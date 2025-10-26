const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI;

const categories = [
    'Excavators',
    'Bulldozers',
    'Wheel Loaders',
    'Backhoe Loaders',
    'Skid Steer Loaders',
    'Motor Graders',
    'Dump Trucks',
    'Concrete Mixers',
    'Cranes',
    'Forklifts',
    'Compactors',
    'Trenchers',
    'Pavers',
    'Scrapers',
    'Telehandlers'
];

const brands = ['Caterpillar', 'Komatsu', 'Volvo', 'John Deere', 'Hitachi', 'JCB', 'Liebherr', 'Doosan'];
const conditions = ['Excellent', 'Good', 'Fair', 'Like New'];
const images = ['YTFMGZ3d.png', 'ZLVDYC.png', '3iLaKHyM.png'];

function generateProducts(category, count = 10) {
    const products = [];
    for (let i = 1; i <= count; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const image = images[Math.floor(Math.random() * images.length)];
        const year = 2015 + Math.floor(Math.random() * 10);
        const price = 150 + Math.floor(Math.random() * 850);
        
        products.push({
            name: `${brand} ${category.slice(0, -1)} ${i}`,
            brand: brand,
            model: `${brand.substring(0, 3).toUpperCase()}-${year}-${i.toString().padStart(3, '0')}`,
            year: year.toString(),
            price: price.toString(),
            weight: `${10 + Math.floor(Math.random() * 40)} tons`,
            productcondition: condition,
            categorie: category,
            des: `Premium ${brand} ${category.toLowerCase().slice(0, -1)} designed for heavy-duty construction and earthmoving operations. Features advanced hydraulic systems, comfortable operator cabin, and exceptional fuel efficiency. Ideal for large-scale projects requiring power and precision.`,
            image: image,
            created_at: new Date()
        });
    }
    return products;
}

async function populateDatabase() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        
        const db = client.db('equipment_rental');
        
        // Clear existing data
        console.log('Clearing existing data...');
        await db.collection('categories').deleteMany({});
        await db.collection('products').deleteMany({});
        await db.collection('users').deleteMany({});
        
        // Insert categories
        console.log('Inserting categories...');
        const categoryDocs = categories.map(cat => ({
            name: cat,
            created_at: new Date()
        }));
        await db.collection('categories').insertMany(categoryDocs);
        console.log(`Inserted ${categories.length} categories`);
        
        // Insert products for each category
        console.log('Inserting products...');
        let totalProducts = 0;
        for (const category of categories) {
            const products = generateProducts(category, 10);
            await db.collection('products').insertMany(products);
            totalProducts += products.length;
            console.log(`Inserted ${products.length} products for ${category}`);
        }
        console.log(`Total products inserted: ${totalProducts}`);
        
        // Insert admin user
        console.log('Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.collection('users').insertOne({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@heavyquips.com',
            role: 'admin',
            created_at: new Date()
        });
        console.log('Admin user created (username: admin, password: admin123)');
        
        console.log('\nDatabase populated successfully!');
        console.log(`Summary:`);
        console.log(`- Categories: ${categories.length}`);
        console.log(`- Products: ${totalProducts}`);
        console.log(`- Admin user: 1`);
        
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

populateDatabase();
