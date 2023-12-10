const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const mongoose = require('mongoose')
const Product = require('./models/product')

const methodOverride = require('method-override')

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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

app.get('/', async (req, res) => {
    res.redirect('/products')
})

app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.get('/dataFile', (req, res) => {
    res.json({
    "code": 1,
    "message": "success",
    "data": [
        {
            "id": 1,
            "name": "XieXun",
            "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/web/1.jpg",
            "gender": 1,
            "job": "Banzhuren",
            "entrydate": "2008-05-09",
            "updatetime": "2022-10-01 12:00:00"
        },
        {
            "id": 2,
            "name": "YinTianZhen",
            "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/web/2.jpg",
            "gender": 1,
            "job": "Jiangshi",
            "entrydate": "2012-05-09",
            "updatetime": "2022-10-01 12:00:00"
        },
        {
            "id": 3,
            "name": "Weiyixiao",
            "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/web/3.jpg",
            "gender": 1,
            "job": "Jiangshi",
            "entrydate": "2020-05-09",
            "updatetime": "2022-10-01 12:00:00"
        },
        {
            "id": 4,
            "name": "Daiqishi",
            "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/web/4.jpg",
            "gender": 2,
            "job": "Jiangshi",
            "entrydate": "2018-05-09",
            "updatetime": "2022-10-01 12:00:00"
        }
    ]
})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`servicing on port ${port}`)
})
