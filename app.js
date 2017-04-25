var express = require('express');

var app = express();

var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var User = require('./user');
var Maps = require('./maps');

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(cookieSession({
  secret: 'SHHisASecret'
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', function (req, res) {
  if (req.session.username && req.session.username !== '') {
    res.redirect('/protected');
  } else {
    res.redirect('/login');
  }
});

app.use('/', express.static('views'))

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  username = req.body.username;
  password = req.body.password;
  User.checkIfLegit(username, password, null, function(err, isRight) {
    if (err) {
      res.send('Error! ' + err);
    } else {
      if (isRight) {
        req.session.username = username;
        res.redirect('/protected');
      } else {
        res.send('wrong password');
      }
    }
  });

});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  User.addUser(req.body.username, req.body.password, [], function(err) {
    if (err) res.send('error' + err);
    else res.send('new user registered with username ' + req.body.username);
  });
});

app.get('/logout', function(req, res) {
  req.session.username = '';
  res.render('logout');
});

app.get('/protected', function(req, res) {
  if (!req.session.username || req.session.username === '') {
    res.send('You tried to access a protected page');
  } else {
    res.render('protected', { username: req.session.username });
  }
});

app.post('/protected', function(req, res) {
  app.redirect('index', { username: req.body.friendname});
});

app.get('/protected/:className/index', function (req, res) {
  if (!req.session.username || req.session.username === '') {
    res.send('You tried to access a protected page');
  } else {
    res.render('index', { username: req.params.className });
  }
});

app.post('/protected/:className/index', function (req, res) {
  var mapstring = req.body.mapstring;

  if (mapstring) {
    var array = mapstring.split("|");
    Maps.addMap(req.params.className, array, function(err) {
      if (err) {
        // map already exits 
        Maps.rewriteMap(req.params.className, array, function(err) {
          if (err) {
            next(err);
          }
        });
      }
    });
    res.send('Map has been saved!');
  } else {
    console.log('from express: user namer is' + req.body.currentUser);
    Maps.getMap(req.body.currentUser, function (err, mapdata) {
      console.log("from express: " + mapdata);
      res.send(mapdata);
    });
  }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() { 
  console.log('listening');
});