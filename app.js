const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./models/product');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://root:example@localhost:27017/admin?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const product = new Product({
        ...req.body
    });
    console.log(req.body);
    product.save()
        .then((product) => res.status(201).json({ product }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })}
            );
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then(product => res.status(200).json({ product: product }))
        .catch(error => res.status(404).json({ error }));
});
app.use('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json({ products: products}))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;