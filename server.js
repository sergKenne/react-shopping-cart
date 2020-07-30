const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { MONGOURI } = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('database connected successful... ');
});

db.on('error', () => {
  console.log('connection Failled');
});


const productRoute = require("./routes/product")
app.use("/api/products", productRoute);

const orderRoute = require('./routes/order');
app.use('/api/orders', orderRoute);

//server static assets if in production

if(process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
    });
}


app.listen(PORT, ()=>{
    console.log(`server running on the ${PORT}`)
})



