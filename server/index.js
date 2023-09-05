const path = require('path');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
// const upload = multer();
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });
const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const db = require('./app/models');

const app = express();

app.use(express.json());
app.use(helmet());

app.use(cors());

// app.use(upload.array());
app.use(express.static('public'));
app.use(cookieParser());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'res/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('image'));

app.use('/res/images', express.static(path.join(__dirname, 'res', 'images')));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Ecom Shop API' });
});

const serverRoutes = require('./app/routes/routes');
app.use('/api/v1', serverRoutes);

// handle error request
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({
        message: message,
        success: false,
        data: data,
    });
});

db.mongoose
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

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});