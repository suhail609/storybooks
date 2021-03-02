const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');


// Load config file
dotenv.config({ path: './config/config.env'});

connectDB();

const app = express();

//this logs requests in console
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//handlebars with .hbs
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//to include own css files pictures and stuff we have to create accessible folder for the application
// create a folder which is static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`))