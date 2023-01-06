var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const jwt = require('jsonwebtoken');
require('dotenv').config();

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

// router.post('/', (req, res, next) => {
//   req.app.locals.con.connect((err) => {
//     if (err) {
//       console.log('Error connecting to Db');
//     }
//     if (req.body.userName == null || req.body.userName == undefined || req.body.userName == '') {
//       return res.json({ message: 'Username is required!' });
//     }
//     else if (req.body.password == null || req.body.password == undefined || req.body.password == '') {
//       return res.json({ message: 'Password is required!' });
//     }
//     else if (req.body.userEmail == null || req.body.userEmail == undefined || req.body.userEmail == '') {
//       return res.json({ message: 'Email is required!' });
//     }
//     else {
//       let sql = `INSERT INTO users (userName, userEmail, password) VALUES ('${req.body.userName}', '${req.body.userEmail}', '${req.body.password}')`;

//       req.app.locals.con.query(sql,
//         (err, result) => {
//           if (err) throw err;
//           console.log("1 record inserted", result);
//         });
//       res.json({ message: 'User created!' });
//     }
//   });
// });

router.put('/:id', (req, res, next) => {
  req.app.locals.con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
    }
    if (req.body.userName == null || req.body.userName == undefined || req.body.userName == '') {
      return res.json({ message: 'Username is required!' });
    }
    else if (req.body.userEmail == null || req.body.userEmail == undefined || req.body.userEmail == '') {
      return res.json({ message: 'Email is required!' });
    }
    else if (req.body.password == null || req.body.password == undefined || req.body.password == '') {
      return res.json({ message: 'Password is required!' });
    }

    else {
      let sql;
      if (req.body.admin == 1 || req.body.admin == 0 && req.body.softDelete == 1 || req.body.softDelete == 0) {
        sql = `UPDATE users SET userName = '${req.body.userName}', userEmail = '${req.body.userEmail}', password = '${req.body.password}', admin = '${req.body.admin}', softDelete = '${req.body.softDelete}' WHERE id = '${req.params.id}'`;
      } else {
        sql = `UPDATE users SET userName = '${req.body.userName}', userEmail = '${req.body.userEmail}', password = '${req.body.password}' WHERE id = '${req.params.id}'`;
      }
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

router.post('/signup', (req, res) => {
  let sql = "select userName, userEmail, password from users where userEmail=?";

  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        sql = "insert into users (userName, userEmail, password) values (?, ?, ?)";
        req.app.locals.con.query(sql, [req.body.userName, req.body.userEmail, req.body.password], (err, result) => {
          if (!err) {
            res.json({
              message: 'User created!'
            });
          } else {
            res.json({
              message: 'Error creating user!'
            });
          }
        }
        );
      } else {
        return res.json({
          message: 'User already exists!'
        });
      }
    } else {
      return res.json({
        message: 'Error creating user!'
      });
    }

  });
});

router.post('/login', (req, res) => {
  let sql = "select userEmail, password, admin from users where userEmail=?";
  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.length <= 0 || result[0].password != req.body.password) {
        return res.json({
          message: 'Incorrect email or password!'
        });
      }
      else if (result[0].admin == 0) {
        return res.json({
          message: 'Wait for admin approval!'
        });
      }
      else if (result[0].password == req.body.password && result[0].admin == 1) {
        const response = { userEmail: result[0].userEmail, password: result[0].password};
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.json({
          accessToken: accessToken,
        });

      } else {
        return res.json({
          message: 'something went wrong! Please try again later!'
        });
      }

    } else {
      return res.json({
        message: 'Error logging in user!'
      });
    }


  });
});


module.exports = router;