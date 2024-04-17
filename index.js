const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uvq0yvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("Doctors-Portal");
    const databaseCollection = database.collection("appointments");

    app.post('/appointments', async (req, res) => {
      const appointment = req.body;
      const result = await databaseCollection.insertOne(appointment);
      console.log(result);
      res.json(result)
    });
  }
  finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Doctors Portal!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})