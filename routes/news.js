var express = require('express');
var auth = require('../services/authentication');
var checkAdmin = require('../services/checkAdmin');
var router = express.Router();

router.post('/add', auth.authenticateToken, checkAdmin.checkAdmin, (req, res, next) => {
    sql = "insert into news (content, userId) values(?,?)";
    req.app.locals.con.query(sql, [req.body.content, req.body.userId], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: 'News added successfully' });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/get', auth.authenticateToken, (req, res, next) => {
    sql = "select news.id,news.content,news.createDate,news.userId,news.softDelete,users.userName from news INNER JOIN users on news.userId = users.id where news.softDelete = 0";
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
    sql = "update news set content = ?, userId = ? where id = ?";
    req.app.locals.con.query(sql, [req.body.content, req.body.userId, req.body.id], (err, result) => {
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

router.delete('/delete', auth.authenticateToken, checkAdmin.checkAdmin, (req, res, next) => {
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
