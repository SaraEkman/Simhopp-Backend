var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');

var app = express();



app.use(cors(
    {
        // origin: ['https://simhopp.vercel.app'],
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        // optionsSuccessStatus: 200,
    }
));


// app.use( (req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', 'https://simhopp.vercel.app');

//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.setHeader('Access-Control-Allow-Credentials', true);

//     next();
// });


// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
//     next();
//     console.log(req.body);
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next();
});

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../Simhopp/src/assets/uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
// app.use(multer({ limits: { fileSize: 50 * 1024 * 1024 } }).single('image'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config();

app.locals.con = mysql.createConnection({
    connectionLimit: 10,
    // multipleStatements: true,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // rootPassword: process.env.MYSQL_ROOT_PASSWORD
});

app.locals.con.connect((err) => {
    if (!err) {
        console.log('Connected to database');
    } else {
        console.log('Connection failed', err);
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.post('/uploads', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    if (req.file == null) {
        return res.status(500).json({ message: 'No image selected' });
    }
    res.send(req.file);
});

module.exports = app;
