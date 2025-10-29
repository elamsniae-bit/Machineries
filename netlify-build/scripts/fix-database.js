// Database fix script - Trim whitespace and add missing products
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function fixDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('equipment_rental');

  console.log('Starting database fixes...\n');

  // 1. Trim whitespace from category names in categories collection
  console.log('1. Fixing category names (trimming whitespace)...');
  const categories = await db.collection('categories').find({}).toArray();
  let categoriesFixed = 0;
  
  for (const cat of categories) {
    const trimmedName = cat.name.trim();
    if (trimmedName !== cat.name) {
      await db.collection('categories').updateOne(
        { _id: cat._id },
        { $set: { name: trimmedName } }
      );
      console.log(`  - Fixed category: "${cat.name}" → "${trimmedName}"`);
      categoriesFixed++;
    }
  }
  console.log(`  ✓ Fixed ${categoriesFixed} categories\n`);

  // 2. Trim whitespace from categorie field in products collection
  console.log('2. Fixing product categories (trimming whitespace)...');
  const products = await db.collection('products').find({}).toArray();
  let productsFixed = 0;
  
  for (const product of products) {
    if (product.categorie) {
      const trimmedCategorie = product.categorie.trim();
      if (trimmedCategorie !== product.categorie) {
        await db.collection('products').updateOne(
          { _id: product._id },
          { $set: { categorie: trimmedCategorie } }
        );
        console.log(`  - Fixed product ${product.id}: "${product.categorie}" → "${trimmedCategorie}"`);
        productsFixed++;
      }
    }
  }
  console.log(`  ✓ Fixed ${productsFixed} products\n`);

  // 3. Add missing Chainsaw products
  console.log('3. Adding missing Chainsaw products...');
  const chainsawProducts = [
    {
      id: 126,
      price: '$749.99',
      name: 'Stihl EcoCut Battery Chainsaw',
      brand: 'Stihl',
      categorie: 'Chainsaw',
      model: 'EcoCut-120',
      status: 'used',
      year: '2021',
      image: '67dae924c9d329.92036010.png',
      description: 'A battery‑powered chainsaw designed for light to medium cutting tasks. It features a brushless motor, ergonomic design, and quiet operation for residential and light commercial use.',
      weight: '9.5 lbs'
    },
    {
      id: 127,
      price: '$829.00',
      name: 'Husqvarna Cordless Chainsaw',
      brand: 'Husqvarna',
      categorie: 'Chainsaw',
      model: 'Cordless-CT500',
      status: 'used',
      year: '2020',
      image: '67daeb1119af52.20426094.jpg',
      description: 'This cordless chainsaw delivers excellent cutting precision with minimal noise. Perfect for residential landscaping, it features a high‑efficiency battery and user‑friendly controls.',
      weight: '10.2 lbs'
    },
    {
      id: 128,
      price: '$899.00',
      name: 'Makita XCU-Series Battery Chainsaw',
      brand: 'Makita',
      categorie: 'Chainsaw',
      model: 'XCU60',
      status: 'used',
      year: '2022',
      image: '67daec984a9572.45440866.jpg',
      description: 'A state‑of‑the‑art battery‑powered chainsaw offering robust cutting power and innovative safety features. Ideal for eco‑friendly operations and smooth, efficient cutting.',
      weight: '11.0 lbs'
    },
    {
      id: 129,
      price: '$649.99',
      name: 'Stihl MS 261 Gasoline Chainsaw',
      brand: 'Stihl',
      categorie: 'Chainsaw',
      model: 'MS261',
      status: 'used',
      year: '2019',
      image: '67daf00a0644f3.34995133.jpg',
      description: 'A robust gasoline chainsaw engineered for heavy‑duty cutting. It features a high‑performance engine and advanced anti‑vibration system to reduce operator fatigue during prolonged use.',
      weight: '12.5 lbs'
    },
    {
      id: 130,
      price: '$719.00',
      name: 'Echo Professional Chainsaw',
      brand: 'Echo',
      categorie: 'Chainsaw',
      model: 'CS-590',
      status: 'used',
      year: '2020',
      image: 'default-chainsaw.png',
      description: 'Professional-grade chainsaw built for demanding commercial applications. Features powerful engine, reduced vibration, and excellent fuel efficiency.',
      weight: '13.0 lbs'
    },
    {
      id: 131,
      price: '$549.99',
      name: 'Poulan Pro Gas Chainsaw',
      brand: 'Poulan Pro',
      categorie: 'Chainsaw',
      model: 'PR5020',
      status: 'used',
      year: '2021',
      image: 'default-chainsaw.png',
      description: 'Versatile gas-powered chainsaw perfect for homeowners and light commercial use. Easy to start, reliable performance, and comfortable to operate.',
      weight: '11.5 lbs'
    },
    {
      id: 132,
      price: '$899.99',
      name: 'Jonsered Professional Chainsaw',
      brand: 'Jonsered',
      categorie: 'Chainsaw',
      model: 'CS2172',
      status: 'new',
      year: '2023',
      image: 'default-chainsaw.png',
      description: 'High-performance professional chainsaw with advanced X-Torq engine technology for reduced emissions and fuel consumption.',
      weight: '12.8 lbs'
    },
    {
      id: 133,
      price: '$459.99',
      name: 'Craftsman Gas Chainsaw',
      brand: 'Craftsman',
      categorie: 'Chainsaw',
      model: 'S165',
      status: 'used',
      year: '2019',
      image: 'default-chainsaw.png',
      description: 'Dependable gas chainsaw ideal for cutting firewood, trimming trees, and general yard maintenance. Features easy-start system.',
      weight: '10.8 lbs'
    },
    {
      id: 134,
      price: '$759.00',
      name: 'Dolmar Professional Chainsaw',
      brand: 'Dolmar',
      categorie: 'Chainsaw',
      model: 'PS-6100',
      status: 'used',
      year: '2020',
      image: 'default-chainsaw.png',
      description: 'Professional chainsaw engineered for forestry and land management. Durable construction with excellent power-to-weight ratio.',
      weight: '13.2 lbs'
    }
  ];

  let chainsawAdded = 0;
  for (const product of chainsawProducts) {
    const existing = await db.collection('products').findOne({ id: product.id });
    if (!existing) {
      await db.collection('products').insertOne(product);
      console.log(`  + Added product ${product.id}: ${product.name}`);
      chainsawAdded++;
    } else {
      console.log(`  - Product ${product.id} already exists, skipping`);
    }
  }
  console.log(`  ✓ Added ${chainsawAdded} Chainsaw products\n`);

  // 4. Verify fixes
  console.log('4. Verifying fixes...');
  const totalProducts = await db.collection('products').countDocuments();
  const chainsawCount = await db.collection('products').countDocuments({ categorie: 'Chainsaw' });
  console.log(`  - Total products: ${totalProducts}`);
  console.log(`  - Chainsaw products: ${chainsawCount}`);
  
  const categoriesAfter = await db.collection('categories').find({}).toArray();
  console.log(`  - Total categories: ${categoriesAfter.length}`);
  console.log('  - Category names:');
  categoriesAfter.forEach(cat => console.log(`    • "${cat.name}"`));

  await client.close();
  console.log('\n✅ Database fixes completed successfully!');
}

fixDatabase().catch(console.error);
