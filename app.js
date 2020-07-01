const express = require('express');
const app = express();
const parser = require('body-parser');

const viewRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
const path = require('path');
const mainPath = require('./util/path');
const errorController = require('./controllers/error-controller');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewRoute.routes);
app.use('/', adminRoute.routes);

app.use(errorController.get404)
app.listen(3001);