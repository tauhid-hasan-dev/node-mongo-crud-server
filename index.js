const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        //API: reading data form database
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        //API: 

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        //API: creating data from client side and posting it to the database.
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.send(result)
        })

        //update
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            console.log(user)
            /* const options = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email,
                    address: user.address,
                },
            };
            const result = await movies.updateOne(filter, updatedUser, options);
            res.send(result); */
        })


        //Delete API: deleting data from database 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(`trying to delete${id}`);
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
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