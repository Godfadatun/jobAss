var express = require('express');
var router = express.Router();

var user = require('../models').user
var job = require('../models').job

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/user')
  .get(function (req, res) {
    user.findAll().then(response => {
        // console.log("All users:", JSON.stringify(users, null, 4));
      res.json({
        status: "success",
        message: "success",
        data: "success",
        model: response
      })
    });
  })
  .post(function (req, res) {
    user.create({
        name: 'req.body.name',
        email: 'req.body.email',
        password: 'req.body.password',
        is_admin: false
    })
    .then(response => {
        res.json({
          status: "success",
          message: "success",
          data: response
        })
    });
  })

  router.post('/auth', function (req, res, next) {
    console.log(req.body)
    user.findOne({
      where: {
        email: 'req.body.email',
        password: 'req.body.password',
      },
      include : ['job'],
      order: [['job', 'id', 'DESC']]

    })
    .then(response => {
      response != null ? res.status(200).json({
        status: "success",
        message: "success",
        data: response
      }): res.status(401).send({
        status: "failed",
        message: "Unauthenticated",
      });
    });
  })

  router.route('/job')
  .get(function (req, res) {
    job.findAll().then(response => {
        // console.log("All users:", JSON.stringify(users, null, 4));
      res.json({
        status: "success",
        message: "success",
        data: "success",
        model: response
      })
    });
  })
  .post(function (req, res) {
    job.create({
        name: 'req.body.name',
        email: 'req.body.email',
        password: 'req.body.password',
        is_admin: false
    })
    .then(response => {
        res.json({
          status: "success",
          message: "success",
          data: response
        })
    });
  })
module.exports = router;
