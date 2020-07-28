const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shopping-card-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("dataBase is connected")
});


const Product = mongoose.model("product", new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    title: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],
}))

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on the ${PORT}`)
})