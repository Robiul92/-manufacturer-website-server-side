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
    const orderCollection = client.db("electricSaw").collection("order");
    
    

    app.get('/tool',  async(req, res) =>{
      const query = {};
      const cursor = toolCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });
    
    app.get('/order',  async(req, res) =>{
      const email = req.query.email;
      const query = {email: email};
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

    // get single items

    app.get('/tool/:id', async(req, res) =>{
      const id = req.params.id;
      
      const query={_id: ObjectId(id)};
      const result = await toolCollection.findOne(query);
      res.send(result);
      console.log(req.params.body);
  });
   
  app.post('/tool', async(req, res)=>{
    const newItem = req.body;
    const result = await  toolCollection.insertOne(newItem)
    res.send(result);
  })
  app.post('/order', async(req, res)=>{
    const newItem = req.body;
    const result = await  orderCollection.insertOne(newItem)
    res.send(result);
  })

  app.delete('/tool/:id',  async(req, res)=>{
    const id = req.params.id;
    const query={_id: ObjectId(id)};
    const result = await toolCollection.deleteOne(query);
    res.send(result);
  });

  // post update

  app.put('/tool/:id',  async(req, res)=>{
    const id = req.params.id;
    console.log({id});
    const updatedUser = req.body;
    const filter ={_id: ObjectId(id)};
    const options = { upsert: true};
    const upDatedDoc = {
      $set: {
        quantity: updatedUser.quantity
      }
    };
    const result = await toolCollection.updateOne(filter, upDatedDoc, options);
    res.send(result);

  })

  }

  finally{
    // await client.close();
  }
};

run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('I can code now');
}) 

app.listen(port , () => {
    console.log('Listening to port');
})

