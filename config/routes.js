module.exports = function (app, passport) {

  // var  index = require('../app/controllers/index')
    var user = require('../app/controllers/user');

    app.get('/', function(req, res){
      res.render('index');
    });

    app.post('/user/signup', user.create);
    app.post('/user/login', passport.authenticate('local', { failureRedirect: '/'}), user.login);
    app.get('/user/test', user.test);
    app.get('/users/:userId', user.show);
    app.post('/user/checkin', user.checkIn);
    app.post('/user/checkout', user.checkOut);
    app.get('/info/:userId', user.checkInfo);
    app.post('/user/makenotes', user.makeNotes);
    app.get('/search', user.search);
    app.post('/search', user.doSearch);
}