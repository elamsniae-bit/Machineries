const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('equipment_rental');

        const { name, email, subject, message } = JSON.parse(event.body);

        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' })
            };
        }

        const contactSubmission = {
            name,
            email,
            subject,
            message,
            created_at: new Date(),
            status: 'new'
        };

        await db.collection('contacts').insertOne(contactSubmission);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: true,
                message: 'Your message has been sent successfully! We\'ll get back to you soon.' 
            })
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to submit contact form' })
        };
    } finally {
        await client.close();
    }
};
