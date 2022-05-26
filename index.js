const express = require('express'); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const res = require('express/lib/response');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2wzc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
    const toolCollection = client.db("electricSaw").collection("tool");

    app.get('/tool',  async(req, res) =>{
        const query = {};
        const cursor = toolCollection.find(query);
        const tools = await cursor.toArray();
        res.send(tools);
      });

    }

    finally{
        // await client.close();
      }
}

app.get('/', (req, res) =>{
    res.send('I can code now');
}) 

app.listen(port , () => {
    console.log('Yes Im Listening');
})