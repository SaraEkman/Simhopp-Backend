var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

/* GET users listing. */
router.get('/', (req, res, next) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
    }

    let sql = `SELECT * FROM users`;

    req.app.locals.con.query(sql, (err, result) => {
      if (err) throw err;
      console.log("1 record inserted", result);
      res.json(result);
    }
    );
  });
});

router.post('/', (req, res, next) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
    }
    if (req.body.userName == null || req.body.userName == undefined || req.body.userName == '') {
      return res.json({ message: 'Username is required!' });
    }
    else if (req.body.password == null || req.body.password == undefined || req.body.password == '') {
      return res.json({ message: 'Password is required!' });
    }
    else if (req.body.userEmail == null || req.body.userEmail == undefined || req.body.userEmail == '') {
      return res.json({ message: 'Email is required!' });
    }
    else if (req.body.admin == null || req.body.admin == undefined || req.body.admin == ''
      || req.body.admin == 'undefined' || req.body.admin == 'null') {
      req.body.admin = 0;

      let sql = `INSERT INTO users (userName, userEmail, admin, password) VALUES ('${req.body.userName}', '${req.body.userEmail}', '${req.body.admin}', '${req.body.password}')`;

      req.app.locals.con.query(sql,
        (err, result) => {
          if (err) throw err;
          console.log("1 record inserted", result);
        });
      res.json({ message: 'User created!' });
    }
  });
});

router.put('/:id', (req, res, next) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
    }
    if (req.body.userName == null || req.body.userName == undefined || req.body.userName == '') {
      return res.json({ message: 'Username is required!' });
    }
    else if (req.body.password == null || req.body.password == undefined || req.body.password == '') {
      return res.json({ message: 'Password is required!' });
    }
    else if (req.body.userEmail == null || req.body.userEmail == undefined || req.body.userEmail == '') {
      return res.json({ message: 'Email is required!' });
    }
    else if (req.body.admin == null || req.body.admin == undefined || req.body.admin == ''
      || req.body.admin == 'undefined' || req.body.admin == 'null') {
      req.body.admin = 0;
      let sql = `UPDATE users SET userName = '${req.body.userName}', userEmail = '${req.body.userEmail}', password = '${req.body.password}' , admin = '${req.body.admin}' WHERE id = '${req.params.id}'`;

      req.app.locals.con.query(sql,
        (err, result) => {
          if (err) throw err;
          console.log("1 record inserted", result);
        });
      res.json({
        message: 'User updated!'
      });
    }
  });
});


// ! This is not working, because it is forgin key in news is connected there, but it should be possible to delete a user
// router.delete('/:id', (req, res, next) => {
//   req.app.locals.con.connect((err) => {
//     if (err) {
//       console.log('Error connecting to Db');
//     }
//     let sql = `DELETE FROM users WHERE id = '${req.params.id}'`;

//     req.app.locals.con.query(sql,
//       (err, result) => {
//         if (err) throw err;
//         console.log("1 record inserted", result);
//       });
//     res.json({
//       message: 'User deleted!'
//     });
//   });
// });


module.exports = router;