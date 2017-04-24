const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const DB = require('./database/database.js');
const User = require('./database/models/user.js');
const LocalStrategy = require('passport-local').Strategy;

/*mongoose.connect('mongodb://localhost/rumorapp');
const db = mongoose.connection;
*/
DB.connect('mongodb://localhost/rumorapp');

const app = express();
// set up file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/original')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/register', upload.single('avatar'), (req, res) => {
	console.log('got a register request');
	console.log(req.body.username);
	const newUser = new User({
		username:req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	console.log(newUser);
	User.createUser(newUser, (err, user) => {
			if(err) throw err;
			console.log(user);
			console.log('registeration succesful');
		});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login', upload.single('avatar'),
  passport.authenticate('local'),
  (req, res) => {
    //res.redirect('/');
    console.log('Authentication succesful');
    res.send({status: 'OK', authentication: true});
  });



