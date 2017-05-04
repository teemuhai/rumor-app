const express = require('express');
const session = require('express-session');
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
const path = require('path');
const dotenv = require('dotenv').config();

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};

const user = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;

/*mongoose.connect('mongodb://localhost/rumorapp');
const db = mongoose.connection;

*/

const app = express();
DB.connect('mongodb://' + user + ':'+ pw +'@' + host, app);

// set up file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const upload = multer({storage: storage});


app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser());

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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //User.getUserById(id, function(err, user) {
    done(null, user);
  //});
});

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


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
  res.json({status: 'OK'});
});

app.post('/login', upload.single('file'),
  passport.authenticate('local'),
  (req, res) => {
    //res.redirect('/');
    console.log('Authentication succesful');
    console.log(req.user);
    // req.session.user = req.user;
    res.send({status: 'OK', auth: true, user: req.user});
  });

app.post('/post', upload.single('file'), (req, res) => {
  console.log('got a postCard request');
  console.log(req.body);  
  console.log(req.file);
  const file = req.file;
  if(file != null){
    console.log('putting file in object');
    req.body.image = 'files/' + file.filename;
    const newPostCard = new PostCard({
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    user: req.body.user,
    userId: req.body.userId,
    image: req.body.image
  });
  console.log('newPostCard here: ' + newPostCard);
  PostCard.createPostCard(newPostCard, (err, card) => {
    console.log('herpderp?');
    res.redirect(200, '/feed');
  });
  }
  else {
    console.log()
    const newPostCard = new PostCard({
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    user: req.body.user,
    userId: req.body.userId
  });
  console.log('newPostCard here: ' + newPostCard);
  PostCard.createPostCard(newPostCard, (err, card) => {
    console.log('herpderp?');
    res.redirect(200, '/feed');
  });
  }
});

app.post('/userposts',  upload.single('somePostImg'), (req, res) => {
  console.log('go to userposts request');
  console.log(req.body);
  PostCard.getUserPostCards(req.body, (posts, err) => {
    if(!err){
      console.log(posts);
      res.send(posts);
    }
    else {
      console.log('error:');
      console.log(err);
    }
  });
});

app.post('/comment', (req, res) => {
  console.log('got to comment post');
  console.log(req.body.user);
  console.log(req.body);
  PostCard.updatePostCard(req.body, (post, err) => {
    if(!err){
      res.send({status: 'ok', post: post});
    }
    else{
      console.log('error: ');
      console.log(err);
    }
  });
});

app.get('/user', (req, res) => {
  console.log('got a user request');
  if(req.user === undefined){
    res.send({status: false});
  }
  else {
    res.json({status: true, user: req.user});
  }
});

app.get('/logout', function(req, res){
  console.log('got a logout get request');
  req.logout();
  res.redirect(200, '/');
});

app.get('/posts', (req, res) =>{
  console.log('received a getPosts request');
  PostCard.getPostCards().then((posts) => {
    res.send(posts);
  });
});

app.delete('/deletepost', (req, res) => {
  console.log('received a deletePost request');
  console.log(req.body);
  PostCard.deletePostCard(req.body, (posts, err) => {
    console.log('success?');
    res.send({status: 'ok', posts: posts});
  });
});

