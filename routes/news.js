var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    req.app.locals.con.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
        }
        let sql = `SELECT * FROM news`;
        req.app.locals.con.query(sql,
            (err, result) => {
                if (err) throw err;
                console.log("1 record inserted", result);
                res.json(result);
            });
    });
});

router.post('/', (req, res, next) => {
    req.app.locals.con.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
        }
        if (req.body.content == null || req.body.content == undefined || req.body.content == '') {
            return res.json({ message: 'Content is required!' });
        } else if (req.body.userId == null || req.body.userId == undefined || req.body.userId == '') {
            return res.json({ message: 'User is required!' });
        } else if (req.body.userId == null || req.body.userId == undefined || req.body.userId == ''
            || req.body.userId == 'undefined' || req.body.userId == 'null') {
            res.json({ message: 'User is required!' });
        } else {
            let sql = `INSERT INTO news (content, userId) VALUES ('${req.body.content}', '${req.body.userId}')`;
            req.app.locals.con.query(sql,
                (err, result) => {
                    if (err) throw err;
                    console.log("1 record inserted", result);
                });

            res.json({ message: 'News created!' });
        }
    });
});

router.put('/:id', (req, res, next) => {
    req.app.locals.con.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
        }
        if (req.body.content == null || req.body.content == undefined || req.body.content == '') {
            return res.json({ message: 'Content is required!' });
        } else if (req.body.userId == null || req.body.userId == undefined || req.body.userId == '') {
            return res.json({ message: 'UserId is required!' });
        }  
    
        else {
            let sql;
            if (req.body.softDelete == 1 || req.body.softDelete == 0) {
                sql = `UPDATE news SET content = '${req.body.content}', userId = '${req.body.userId}', softDelete = '${req.body.softDelete}' WHERE id = '${req.params.id}'`;
                
            } else {
                sql = `UPDATE news SET content = '${req.body.content}', userId = '${req.body.userId}' WHERE id = '${req.params.id}'`;
            }
            req.app.locals.con.query(sql,
                (err, result) => {
                    if (err) throw err;
                    console.log("1 record inserted", result);
                });

            res.json({ message: 'News updated!' });
        }
    });
});






module.exports = router;
