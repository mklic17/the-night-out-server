var router = require('express').Router();
var Task = require('../models/task');

router.get('/', function(req, res) {
  // console.log(req.body.data);
  Task
    .find({})
    .then(function(tasks) {
      res.json(tasks);
    });
});

router.get('/:id', function(req, res) {
  Task
    .findOne({
      _id: req.params.id
    })
    .then(function(task) {
      res.json(task);
    });
});


router.post('/', function(req, res) {
  var task = new Task({
    age: req.body.task.age,
    category: req.body.task.category,
    fullDesc: req.body.task.fullDesc,
    likes: req.body.task.likes,
    location: req.body.task.location,
    price: req.body.task.price,
    summary: req.body.task.summary,
    time: req.body.task.time
  });
  // console.log(task);

  task.save().then(function(taskData) {
    console.log(taskData);
    res.json({
      message: 'Created Task',
      task: taskData
    });
  });
});

router.put('/:id', function(req, res) {
  Task.findOne({ _id: req.params.id }).then(function(task) {
    task.age = req.body.task.age;
    task.category = req.body.task.category;
    task.fullDesc = req.body.task.fullDesc;
    task.likes = req.body.task.likes + 1;
    task.location = req.body.task.location;
    task.price = req.body.task.price;
    task.summary = req.body.task.summary;
    task.time = req.body.task.time;
    task.save().then(function() {
      res.json({
        message: 'Successfully update',
        task: task
        });
      },
      function(result) {
        res.json({ message: 'Aww, cuss!' });
      });
    },
    function(result) {
      res.json({ message: 'Aww, cuss!' });
    });
  });



module.exports = router;
