var users = require('../controllers/users.js');

module.exports = function(app){
  // app.get('/', function(req, res) {
  //   friends.index(req, res);
  // });
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
  app.get('/profile/:userid', function(req, res) {
    users.profile(req, res);
  });
}
