const mongoose = require('mongoose')
const Product = require('./models/product')

require('dotenv').config()

const dbUrl = process.env.DB_URL

mongoose.connect(dbUrl)
    // mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log('Mongo connection open!')
    })
    .catch(err => {
        console.log('Oh, no, Mongo connection error')
        console.log(err)
    })

const seedProducts = [
    {
        name: 'Ruby Gapefruit',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })