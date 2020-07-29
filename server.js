const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());

const { MONGOURI } = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
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
}));



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

const Order = mongoose.model("order", new mongoose.Schema(
    {
        _id: { type: String, default: shortid.generate},
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [
            {
                _id: String,
                title: String,
                price: Number,
                count: Number,
            }
        ],
    },
    {
        timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
    if(
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems 
    ) {
        return res.send({message: "Data is required"})
    }

    const order = await Order(req.body).save();
    res.send(order);
});


//server static assets if in production



if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static('build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html')); 
    });

    //set static folder
    // app.use(express.static('build'));
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname,  'build', 'index.html')); 
    // });




    // app.use(favicon(__dirname + '/build/favicon.ico'));
    // app.use(express.static('build'));
    // //app.use(express.static(__dirname));
    // //app.use(express.static(path.join(__dirname, 'build')));
    // app.get('/ping', function (req, res) {
    // return res.send('pong');
    // });
    // app.get('/*', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // });

    // app.use('/', express.static(__dirname + '/build'));
    // app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));


}

app.listen(PORT, ()=>{
    console.log(`server running on the ${PORT}`)
})

