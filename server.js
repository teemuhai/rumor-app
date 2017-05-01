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
const http = require('http');
const https = require('https');
const fs = require('fs');
const PostCard = require('./database/models/postCard.js');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};

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

/*app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});*/


https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Find the server at: https://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:3001' + req.url });
      res.end();
}).listen(8080);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}


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
      console.log('registeration succesful');
    });
  res.send({status: 'OK'});
});

app.post('/login', upload.single('avatar'),
  passport.authenticate('local'),
  (req, res) => {
    //res.redirect('/');
    console.log('Authentication succesful');
    res.send({status: 'OK', auth: true, user: req.user});
    res.send({auth: false});
  });

app.post('/post', upload.single('postImage'), (req, res) => {
  console.log('got a postCard request');
  console.log(req.body);
  const newPostCard = new PostCard({
    title: req.body.title,
    description: req.body.description,
    time: req.body.time
  });
  console.log('newPostCard here: ' + newPostCard);
  PostCard.createPostCard(newPostCard, (err, card) => {
      if(err) throw err;
      console.log('is this card? ' + card);
      console.log('Created post to database!');
    });
  res.send({status: 'OK'});
});


app.get('/posts', (req, res) =>{
  console.log('received a getPosts request');
  PostCard.getPostCards().then((posts) => {
    console.log(posts);
    res.send(posts);
  });
});


