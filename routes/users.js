var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

const jwt = require('jsonwebtoken');
const nodeMalier = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkAdmin = require('../services/checkAdmin');

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
            res.status(200).json({
              message: 'Successfully registered!'
            });
          } else {
            res.status(500).json({
              message: err
            });
          }
        }
        );
      } else {
        return res.status(400).json({
          message: 'User already exists!'
        });
      }
    } else {
      return res.status(500).json({
        message: err
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
        return res.status(401).json({
          message: 'Incorrect email or password!'
        });
      }
      else if (result[0].admin == 0) {
        return res.status(401).json({
          message: 'Wait for admin approval!'
        });
      }
      else if (result[0].password == req.body.password && result[0].admin == 1) {
        const response = { userEmail: result[0].userEmail, password: result[0].password };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.status(200).json({
          accessToken: accessToken,
        });

      } else {
        return res.status(400).json({
          message: 'something went wrong! Please try again later!'
        });
      }

    } else {
      return res.status(500).json({
        message: err
      });
    }
  });
});

var transporter = nodeMalier.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD
  }
});

router.post('/forgotPassword', (req, res) => {
  let sql = "select userEmail,password from users where userEmail=?";
  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        return res.status(200).json({
          message: 'Password sent successfully to your email!'
        });
      }
      else {
        var mailOptions = {
          from: process.env.USEREMAIL,
          to: req.body.userEmail,
          subject: 'Password by Simhopp Management System',
          html: '<h1>Your login details for Simhopp Management System </h1><p>userEmail: ' + result[0].userEmail + '<br>Password: ' + result[0].password + '<br><a href="http://localhost:4200/">Click here to login</a></p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.status(200).json({
          message: 'Password sent successfully to your email!'
        });
      }
    } else {
      return res.status(500).json({
        message: err
      });
    }
  });
});

router.get('/get', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  const sql = "select id,userName, userEmail, admin, softDelete from users where admin='0'";
  req.app.locals.con.query(sql, (err, result) => {
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).json({
        message: err
      });
    }
  }
  );
});

router.patch('/update', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  let sql = "update users set admin=? where id=?";
  req.app.locals.con.query(sql, [req.body.admin, req.body.id], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.affectedRows == 0) {
        return res.status(404).json({
          message: 'User id dose not exist!'
        });
      }
      return res.status(200).json({
        message: 'User updated successfully!'
      });
    } else {
      res.status(500).json({
        message: err
      });
    }
  });
});

router.delete('/delete', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  let sql = "update users set softDelete=? where id=?";
  req.app.locals.con.query(sql, [1, req.body.id], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.affectedRows == 0) { 
        return res.status(404).json({
          message: 'User id dose not exist!'
        });
      }
      return res.status(200).json({
        message: 'User deleted successfully!'
      });
    } else {
      res.status(500).json({
        message: err
      });
    }
  });
});

router.get('/checkToken', auth.authenticateToken, (req, res) => {
  return res.status(200).json({
    message: 'true'
  });
});

router.post('/changePasswordUser', (req, res) => {
  let sql = "select *from users where admin='0' and userEmail=?";
  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.length <= 0) {
        return res.status(401).json({ message: 'Incorrect userEmail!' });
      }
      else if (result[0].userEmail == req.body.userEmail && result[0].admin == 0) {
        sql = "update users set password=? where userEmail=?";
        req.app.locals.con.query(sql, [req.body.newPassword, req.body.userEmail], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: 'Password changed successfully!' });
          } else {
            return res.status(500).json({ message: err });
          }
        });
      }

      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' + err });
      }
    } else {
      return res.status(500).json({ message: err });
    }
  });
});

router.post('/changeUserEmail', (req, res) => {
  let sql = "select *from users where admin='0' and password=?";
  req.app.locals.con.query(sql, [req.body.password], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.length <= 0) {
        return res.status(401).json({ message: 'Incorrect password!' });
      }
      else if (result[0].password == req.body.password && result[0].admin == 0) {
        sql = "update users set userEmail=? where password=?";
        req.app.locals.con.query(sql, [req.body.newUserEmail, req.body.password], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: 'Email changed successfully!' });
          } else {
            return res.status(500).json({ message: err });
          }
        });
      }

      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' + err });
      }
    } else {
      return res.status(500).json({ message: err });
    }
  });
});

router.post('/changePasswordAdmin', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  let sql = "select *from users where admin='1' and userEmail=?";
  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.length <= 0) {
        return res.status(401).json({ message: 'Incorrect userEmail!' });
      }
      else if (result[0].userEmail == req.body.userEmail && result[0].admin == 1) {
        sql = "update users set password=? where userEmail=?";
        req.app.locals.con.query(sql, [req.body.newPassword, req.body.userEmail], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: 'Password changed successfully!' });
          } else {
            return res.status(500).json({ message: err });
          }
        });
      }
      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' + err });
      }
    } else {
      return res.status(500).json({ message: err });
    }
  });
});



module.exports = router;