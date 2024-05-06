const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 9000;

// Middle Ware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStarus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jm3t3oc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const jobsCollection = client.db("soloSphere").collection("jobs");
        const bidsCollection = client.db("soloSphere").collection("bids");

        // Get All job data from db
        app.get("/jobs", async (req, res) => {
            const result = await jobsCollection.find().toArray();
            res.send(result)
        })

        // Get a single job data from db
        app.get('/job/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollection.findOne(query);
            res.send(result);
        })

        // Save a bid Data in database
        app.post('/bid',async(req,res)=>{
            const bidData = req.body;
            console.log(bidData);
            const result = await bidsCollection.insertOne(bidData);
            res.send(result)
        })

        // Save a job Data in database
        app.post('/job',async(req,res)=>{
            const jobData = req.body;
            console.log(jobData);
            const result = await jobsCollection.insertOne(jobData);
            res.send(result)
        })

        // Get all jobs posted by a specifiq user
        app.get('/jobs/:email',async(req,res)=>{
            const email = req.params.email;
            const query = { 'bayer.email': email };
            const result = await jobsCollection.find().toArray();
            res.send(result);
        })

        // Delete a job data from db
        app.delete('/job/:id',async(req,res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollection.deleteOne(query);
            res.send(result);
        })

        // Update a job in db
        app.put('/job/:id',async(req,res)=>{
            const id = req.params.id;
            const jobData = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                  ...jobData
                },
              };
            const result = await jobsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('soloSphere server running on Port');
})

app.listen(port, () => {
    console.log(`soloSphere server running on : ${port}`);
})