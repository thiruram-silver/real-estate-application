/* GET Login page. */

module.exports = function(app, passport) {
  app.get('/', function(req, res, next) {
    res.render('login.ejs', { title: 'Please Login', message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
