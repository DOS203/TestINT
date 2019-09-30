const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');




var indexRouter = require('./routes/index');

const app = express();
//DB config
const db = require('./config/database');

// Load routes
const users = require('./routes/users');
const orders = require('./routes/orders');
const payment = require('./routes/payment')
const delivery = require('./routes/delivery');



// Passport Config
require('./config/passport')(passport);

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;


// Connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


  //  mongoose.connect('mongodb://127.0.0.1:27017/shopping', {useNewUrlParser: true});

// puttt




// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

       app.use(cookieParser());
       app.use(express.static(path.join(__dirname, 'public')));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
//app.get('/', (req, res) => {
 // const title = 'Welcome';
 //res.render('index', {
 // title: title
//  });
//});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/payment', (req, res) => {
  res.render('payment');
});

app.get('/delivery', (req, res) => {
  res.render('delivery');
});

app.get('/courier', (req, res) => {
  res.render('courier');
});

app.get('/deliveryDT', (req, res) => {
  res.render('deliveryDT');
});
app.get('/deliveryTracking', (req, res) => {
  res.render('deliveryTracking');
});
app.get('/deliveryFree', (req, res) => {
  res.render('deliveryFree');
});

// Use routes
app.use('/users', users);
app.use('/payment', payment);
app.use('/orders', orders);
app.use('/delivery', delivery);

app.use('/', indexRouter);

//Load 404 page (if page is not exist!)
app.use((req ,res) => res.render('not_found'));


const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});
