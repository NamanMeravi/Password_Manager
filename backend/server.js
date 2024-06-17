import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser';
import 'dotenv/config'
import cors from 'cors'
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOp';

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

await client.connect();

//Get all the Passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save all the Password
app.post('/', async(req, res) => {
    const Password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(Password);
  res.send({success: true, result: findResult})
})

//Delete passwords
app.delete('/', async(req, res) => {
    const Password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(Password);
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})