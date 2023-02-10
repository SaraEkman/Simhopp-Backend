var express = require('express');
var auth = require('../services/authentication');
var checkAdmin = require('../services/checkAdmin');
var router = express.Router();
const cors = require('cors');

router.use(cors({
    // origin: ['https://simhopp.vercel.app'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // optionsSuccessStatus: 200,
    
}));

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next();
});

router.post('/add', auth.authenticateToken, checkAdmin.checkAdmin, (req, res, next) => {
    sql = "insert into news (content, userId, image) values(?,?,?)";
    req.app.locals.con.query(sql, [req.body.content, req.body.userId, req.body.image], (err, result) => {
        console.log(result);
        if (!err) {
            return res.status(200).json({ message: 'News added successfully', id: result.insertId });
        } else {
            return res.status(500).json(err);
        }
    });
});


router.get('/', (req, res, next) => {
    console.log(req.query.limit);
    sql = "select id,content,createDate,image from news where softDelete = 0 order by createDate desc limit " + req.query.limit;
    console.log(sql);
    req.app.locals.con.query(sql, (err, result) => {
        console.log(result);
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});



router.get('/get', auth.authenticateToken, (req, res, next) => {
    sql = "select news.id,news.content,news.image,news.createDate,news.userId,news.softDelete,users.userName from news INNER JOIN users on news.userId = users.id order by createDate desc";
    req.app.locals.con.query(sql, (err
        , result) => {
        console.log(result);
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/update', auth.authenticateToken, checkAdmin.checkAdmin, (req, res, next) => {
    sql = "update news set content = ?, image = ?, userId = ? where id = ?";
    req.app.locals.con.query(sql, [req.body.content, req.body.image, req.body.userId, req.body.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: 'News id not found' });
            }
            return res.status(200).json({ message: 'News updated successfully' });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.patch('/delete', auth.authenticateToken, checkAdmin.checkAdmin, (req, res, next) => {
    sql = "update news set softDelete = ? where id = ?";
    req.app.locals.con.query(sql, [req.body.softDelete, req.body.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: 'News id not found' });
            }
            return res.status(200).json({ message: 'News deleted successfully' });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
