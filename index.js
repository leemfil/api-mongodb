const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3333;

const url = 'mongodb+srv://filip:Am128CWE5imcmaRA@cluster0.ejpzqq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
let db;

app.use(express.json()); // JSON verwerken

async function start() {
    try {
        await client.connect();
        db = client.db('school'); // gebruik de databank 'school'

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Fout bij verbinden met MongoDB:', err);
    };
};

start();

// 📄 Alle leerlingen ophalen
app.get('/leerlingen', async (req, res) =>{
    const leerlingen = 
    await db.collection('leerlingen').find().toArray();
    res.json(leerlingen);
});

app.post('/leerlingen', async (req, res) => {
    const leerling = req.body;
    
    const result = await db.collection('leerlingen').insertOne(leerling);
    res.status(201).json(result);
});