const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
require('dotenv').config()

app.use(cors)
app.use(express.json())

mongoose.mongoose
    .connect(
        `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ecomshopcluster.evimone.mongodb.net/${process.env.DATABASE_NAME}`,
    )
    .then(() => {
        console.log('connect success');
    })
    .catch((err) => {
        console.error('connection error', err);
        process.exit;
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})