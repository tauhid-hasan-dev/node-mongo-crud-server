const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())

//username: dbuser3
//password: xXHJQOq20Aw599gK



const uri = "mongodb+srv://dbuser3:xXHJQOq20Aw599gK@cluster0.jjvuikj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const userCollection = client.db("crud-for-node").collection("users");
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userCollection.insertOne(user);
            res.send(result)
            console.log(result);
        })
    } finally {

    }
}

run().catch(e => console.log(e))

app.get('/', (req, res) => {
    res.send('Node mongo server is running')
})

app.listen(port, () => {
    console.log(`Node mongo server is running on ${port}`);
})