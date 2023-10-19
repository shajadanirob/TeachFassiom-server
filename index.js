const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");

// middleWare
app.use(cors())
app.use(express.json())

// TeachFusion
// wss2VhCTNBTvNROy


const uri = "mongodb+srv://TeachFusion:wss2VhCTNBTvNROy@cluster0.ul0jqdv.mongodb.net/?retryWrites=true&w=majority";

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
        await client.connect();
        const database = client.db("ProductsDB");
        const productsCollection = database.collection("products");


        app.post("/products", async (req, res) => {
            const products = req.body;
            console.log(products);
            const result = await productsCollection.insertOne(products);
            console.log(result);
            res.send(result);
        });


        app.get("/products", async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result);
        });

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id),
            };
            const result = await productsCollection.findOne(query);
            console.log(result);
            res.send(result);
          });

         









app.get('/products/:brand' ,async(req,res)=>{
    const brand = req.params.brand;
    const query = { brand: brand }
    const result = await productsCollection.find(query).toArray();
    res.send(result)
})



//  app.get("/products/:id", async (req, res) => {
//             const id = req.params.id;
//             const query = {
//                 _id: new ObjectId(id),
//             };
//             const result = await productsCollection.findOne(query);
//             console.log(result);
//             res.send(result);
//           });




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);














app.get("/", (req, res) => {
    res.send("Crud is running...");
});



app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
});


