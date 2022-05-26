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



app.get('/', (req, res) =>{
    res.send('I can code now');
}) 

app.listen(port , () => {
    console.log('Yes Im Listening');
})