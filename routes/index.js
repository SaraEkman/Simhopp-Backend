var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  sql = "select * from users";
  req.app.locals.con.query(sql, (err, result) => {
    console.log(result);
    if (!err) {
      // return res.status(200).json(result);
      res.json(result);
    } else {
      return res.status(500).json(err);
    }
  });

});

module.exports = router;
