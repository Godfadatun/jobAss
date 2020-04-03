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
        description: 'req.body.email',
        user_id: 1,
        status: false,
        expiry_date: "2020-04-03T13:15:52.170Z"
    })
    .then(response => {
        res.json({
          status: "success",
          message: "success",
          data: response
        })
    })
  })

  .put(function (req, res) {
    // job.findByPk(req.body.id)
    job.update({
      name: 'req.body.nameUpdated4',
      description: 'req.body.email',
      user_id: 2,
      status: false,
      expiry_date: "2020-04-03T13:15:52.170Z"
    },
    {
      where: {
        id: 4
      }
    })
    .then(response => {
      res.json({
        status: "success",
        message: "success",
        data: response
      })
    })

  })

  .delete(function (req, res, next) {
    job.destroy({
      where: {
        id: 3
      }
    })
    .then(response => {
      res.json({
        status: "success",
        message: "success",
        data: response
      })
    })
    // next(new Error('not implemented'))
  })

  router.get('/jobFind', function (req, res, next) {
    console.log(req.body)
    job.findByPk(2)
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

module.exports = router;
