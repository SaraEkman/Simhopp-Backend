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
        let sql = `INSERT INTO news (content, userId) VALUES ('${req.body.content}', '${req.body.userId}')`;
        req.app.locals.con.query(sql,
            (err, result) => {
                if (err) throw err;
                console.log("1 record inserted", result);
            });
    });
    res.json({ message: 'News created!' });
});



module.exports = router;
