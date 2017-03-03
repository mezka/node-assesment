var Express = require('express');
var bodyParser = require('body-parser');
var userCtrl = require('./userCtrl.js');

var app = Express();
var port = 9876;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', function(req, res){

  if(req.query.favorite){
    res.status(200).send(userCtrl.getUsersByFavorite(req.query.favorite));
  }else if(req.query.age){
    res.status(200).send(userCtrl.getUsersByAgeLimit(req.query.age));
  }else if(req.query.last_name){
    console.log(req.query.last_name);
    res.status(200).send(userCtrl.findUserByQuery('last_name', req.query.last_name));
  }else if(req.query.email){
    res.status(200).send(userCtrl.findUserByQuery('email', req.query.email));
  }else{
    res.status(200).send(userCtrl.readAll());
  }
});

app.get('/api/users/:userId', function(req, res){

  var userId = req.param('userId');

  var out = userCtrl.findUserById(userId);

  if(!out)
    res.status(404).send();
  else
    res.status(200).send(out);
});

app.get('/api/admins', function(req, res){
  console.log('GET /api/admins');

  res.status(200).send(userCtrl.getAdmins());
});

app.get('/api/noadmins', function(req, res){
  console.log('GET /api/noadmins');

  res.status(200).send(userCtrl.getNonAdmins());
});

app.put('/api/users/:userId', function(req, res){

  console.log('PUT /api/users/:userId');

  var userId = req.param('userId');
  var changeObj = req.body;

  res.status(200).send(userCtrl.updateUser(userId, changeObj));

});

app.post('/api/users', function(req, res){
  console.log('POST /api/users/:userId');

  res.status(200).send(userCtrl.createUser(req.body));
});

app.delete('/api/users/:userId', function(req, res){
  console.log('DELETE /api/users/:userId');

  var userId = req.param('userId');

  console.log(userId);

  res.status(200).send(userCtrl.removeUser(userId));
});

app.listen(port, function(){
  console.log('Listening on: ', port);
});
