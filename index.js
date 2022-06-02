const express = require('express'); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const res = require('express/lib/response');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware

app.use(cors({origin:'https://electric-saw.web.app/'}));
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2wzc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
  try{
    await client.connect();
    const toolCollection = client.db("electricSaw").collection("tool");
    const orderCollection = client.db("electricSaw").collection("order");
    const userCollection = client.db('electricSaw').collection('user');
    
    

    app.get('/tool',  async(req, res) =>{
      const query = {};
      const cursor = toolCollection.find(query);
      const tools = await cursor.toArray();
      res.send(tools);
    });
    
    // app.get('/order',  async(req, res) =>{
    //   const email = req.query.email;
    //   const query = {email: email};
    //   const cursor = orderCollection.find(query);
    //   const orders = await cursor.toArray();
    //   res.send(orders);
    // });

    app.get('/user',  async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });
    
    app.get('/order',  async (req, res) => {
      const query=req.query.email;
      const orders = await orderCollection.find().toArray();
      res.send(orders);
    });
  //   app.get('/order/:name',  async (req, res) => {
  //     const name = req.params.name;
      
  //     const query=req.query.name;
  //     const result = await orderCollection.findOne(query);
  //     res.send(result);
  //     console.log(req.params.body);
  // });
   

    // app.get('/orders', async (req, res) => {
    //   const name = req.query.name;
    //   console.log(name);
    //   const decodedEmail = req.decoded.email;
    //   if (name === decodedEmail) {
    //     const query = { name: name };
    //     const orders = await orderCollection.find(query).toArray();
    //     return res.send(orders);
    //   }
    //   else {
    //     return res.status(403).send({ message: 'forbidden access' });
    //   }
    // })


    // app.post('/order', async (req, res) => {
    //   const order = req.body;
    //   const query = { name: order.name, email: order.email }
    //   const exists = await orderCollection.findOne(query);
    //   if (exists) {
    //     return res.send({ success: false, booking: exists })
    //   }
    //   const result = await orderCollection.insertOne(order);
    //   return res.send({ success: true, result });
    // })

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

  // app.get('/admin/:email', async(req, res) =>{
  //   const email = req.params.email;
  //   const user = await userCollection.findOne({email: email});
  //   const isAdmin = user.role === 'admin';
  //   res.send({admin: isAdmin});
  // })



  // app.put('/user/admin/:email',  async (req, res) => {
  //   const email = req.params.email;
  //   const requester = req.decoded.email;
  //   const requesterAccount = await userCollection.findOne({ email: requester });
  //   if (requesterAccount.role === 'admin') {
  //     const filter = { email: email };
  //     const updateDoc = {
  //       $set: { role: 'admin' },
  //     };
  //     const result = await userCollection.updateOne(filter, updateDoc);
  //     res.send(result);
  //   }
  //   else{
  //     res.status(403).send({message: 'forbidden'});
  //   }

  // })

  app.put('/user/:email',  async(req, res)=>{
    const email = req.params.email;
    console.log({email});
    const user = req.body;
    const filter ={email: email};
    const options = { upsert: true};
    const upDatedDoc = {
      $set: user,
      
    };
    const result = await userCollection.updateOne(filter, upDatedDoc, options);
    res.send(result);

  })

  a

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

