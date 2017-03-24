var users = require('../controllers/users.js');
var polls = require('../controllers/polls.js');

module.exports = function(app){
  app.post('/register', function(req, res) {
    // console.log(req.body);
    users.register(req, res);
  });
  app.post('/login', function(req, res) {
    // console.log(req.body);
    users.login(req, res);
  });
  app.get('/logout', function(req, res) {
    // console.log(req.body);
    users.logout(req, res);
  });
  app.get('/checkstatus', function(req, res) {
    users.checkstatus(req, res);
  });
  app.get('/polls', function(req, res) {
    polls.index(req, res);
  });
  app.get('/polls/:id', function(req, res) {
    polls.show(req, res);
  });
  app.post('/polls', function(req, res) {  //create new poll
    polls.createpoll(req, res);
  });
  app.post('/polls/:id', function(req, res) {  //update poll
    polls.updatepoll(req, res);
  });
  app.delete('/polls/:id', function(req, res) {
    polls.deletepoll(req, res);
  });
}
