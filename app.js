require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var taskRoutes = require('./routes/task-routes');
var userRoutes = require('./routes/user-routes');
// var sessionRoutes = require('./routes/session-routes');
var headersMiddleware = require('./middleware/headers');
// var authMiddleware = require('./middleware/auth');

var app = express();
var port = 3000

app.use(headersMiddleware);
// app.use(authMiddleware);

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
// app.use('/sessions', sessionRoutes);


app.listen(port, function() {
  console.log('Listening on http://localhost:' + port);
});
