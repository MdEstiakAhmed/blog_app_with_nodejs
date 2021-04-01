const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const config = require('config')

const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboardRoute');

const { bindUserWithRequest } = require('./middleware/authMiddleware');
const {localMiddleWare} = require('./middleware/localMiddleware');

const app = express();

// config
require('dotenv').config();

var store = new MongoDBStore({
	uri: process.env.DB_PATH,
	collection: 'sessions',
	expires: 1000 * 60 * 60 * 24
});
// config

// view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// view engine

// middleware
const middleware = [
	express.static('public'),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: 'SECRET_KEY',
		resave: false,
		saveUninitialized: false,
		store: store,
	}),
	bindUserWithRequest(),
	localMiddleWare(),
	flash()
];
app.use(middleware);
// middleware

if(app.get('env').toLowerCase() === 'development'){
	app.use(morgan('dev'))
}

// route
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
// route

app.get('/', (req, res) => {
	res.json({
		message: 'Hello World'
	})
});

// server connect
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(config.get('name'));
	console.log(config.get('mode'));
	// console.log(config.get('config_check_token'));
	console.log(`Server is running on PORT: ${PORT}`);
});
// server connect