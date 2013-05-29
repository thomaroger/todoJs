var express = require('express');
var app = express();
var routing = require('./routing/routing');

app.use(express.cookieParser())
.use(express.session({secret: 'secretTodo'}))
.use(express.bodyParser());

routing.setup(app);

app.listen(8080);