var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const nodeMalier = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkAdmin = require('../services/checkAdmin');
router.use(cors({
  origin: 'https://simhopp.vercel.app',
  // origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
}));

router.post('/signup', (req, res) => {
  let sql = "select userName, userEmail, password from users where userEmail=?";

  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        sql = "insert into users (userName, userEmail, password) values (?, ?, ?)";
        req.app.locals.con.query(sql, [req.body.userName, req.body.userEmail, req.body.password], (err, result) => {
          if (!err) {
            res.status(200).json({ message: 'Successfully registered!' });
          } else {
            res.status(500).json(err);
          }
        }
        );
      } else {
        return res.status(400).json({ message: 'User already exists!' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post('/login', (req, res) => {
  let sql = "select id, userEmail, password, admin, softDelete from users where userEmail=?";
  req.app.locals.con.query(sql, [req.body.userEmail], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.length <= 0 || result[0].password != req.body.password) {
        return res.status(401).json({ message: 'Incorrect email or password!' });
      }
      else if (result[0].admin == 0) {
        return res.status(200).json({
          message: 'Welcome to Simhopp, you are logged in as a user! So you can only see the events and if you want to change your mail do it in the profile page!',
          userId: result[0].id, userEmail: result[0].userEmail
        });
      }
      else if (result[0].password == req.body.password && result[0].admin == 1 && result[0].softDelete == 1) {
        return res.status(401).json({ message: 'User is deleted!' });
      }
      else if (result[0].password == req.body.password && result[0].admin == 1 && result[0].softDelete == 0) {
        const response = { userEmail: result[0].userEmail, password: result[0].password };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
        res.status(200).json({
          message: 'Welcome to Simhopp, you are logged in as an admin! So you can see all the events and you can add, edit and delete events!',
          accessToken: accessToken, userId: result[0].id
        });
      } else {
        return res.status(400).json({
          message: 'something went wrong! Please try again later!'
        });
      }

    } else {
      return res.status(500).json(err);
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
          subject: 'Password by Simhopp System',
          html: '<h1>Your login details for Simhopp System </h1><p>userEmail: ' + result[0].userEmail + '<br>Password: ' + result[0].password + '<br><a href="http://localhost:4200/">Click here to login</a></p>'
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
      return res.status(500).json(err);
    }
  });
});

router.get('/get', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  const sql = "select id,userName, userEmail, admin, softDelete from users";
  req.app.locals.con.query(sql, (err, result) => {
    if (!err) {
      return res.json(result);
    } else {
      return res.status(500).json(err);
    }
  }
  );
});

router.patch('/update', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  let sql = "update users set userName=?,userEmail=?,password=?,admin=? where id=?";
  req.app.locals.con.query(sql, [req.body.userName, req.body.userEmail, req.body.password, req.body.admin, req.body.id], (err, result) => {
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
      res.status(500).json(err);
    }
  });
});

router.patch('/delete', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  let sql = "update users set softDelete=? where id=?";
  req.app.locals.con.query(sql, [req.body.softDelete, req.body.id], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.affectedRows == 0) {
        return res.status(404).json({
          message: 'User id dose not exist!'
        });
      }
      return res.status(200).json({
        message: 'User deleted or undeleted successfully!'
      });
    } else {
      res.status(500).json(err);
    }
  });
});

router.delete('/delete/:id', auth.authenticateToken, checkAdmin.checkAdmin, (req, res) => {
  
  let sql = "delete from users where id=? and admin='0'";
  req.app.locals.con.query(sql, [req.params.id], (err, result) => {
    console.log(result);
    if (!err) {
      if (result.affectedRows == 0) {
        return res.status(404).json({
          message: 'User id dose not exist! or User is an admin!'
        });
      }
      return res.status(200).json({
        message: 'User deleted successfully!'
      });
    } else {
      res.status(500).json(err);
    }
  }
  );
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
            return res.status(500).json(err);
          }
        });
      }
      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post('/changeUserEmail', (req, res) => {
  let sql = "select *from users where admin='0' and id=? and userEmail=? and password=?";
  req.app.locals.con.query(sql, [req.body.id, req.body.userEmail, req.body.password], (err, result) => {
    console.log(result[0]);
    if (!err) {
      if (result.length <= 0) {
        return res.status(401).json({ message: 'Incorrect uppgifter!' });
      }
      else if (result[0].userEmail == req.body.userEmail && result[0].admin == 0 && result[0].password == req.body.password) {
        sql = "update users set userEmail=? where id=?";
        req.app.locals.con.query(sql, [req.body.newUserEmail, req.body.id], (err, result) => {
          if (!err) {
            return res.status(200).json({ message: 'Email changed successfully! Try logging in again with the new email' });
          } else {
            return res.status(500).json(err);
          }
        });
      }

      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' + err });
      }
    } else {
      return res.status(500).json(err);
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
            return res.status(500).json(err);
          }
        });
      }
      else {
        return res.status(400).json({ message: 'something went wrong! Please try again later!' + err });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});



module.exports = router;