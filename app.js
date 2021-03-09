const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const connectDB = require('./config/db');




console.log(passport.initialize());
// Load config file
dotenv.config({ path: './config/config.env'});

//passport config
require('./config/passport')(passport);

connectDB();


const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//this logs requests in console
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//set handlebars with .hbs
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "session",
      mongooseConnection: mongoose.connection
    })
  }))

//set Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// to include own css files pictures and stuff we have to create accessible folder for the application
// create a folder which is static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`))