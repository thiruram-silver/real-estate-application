/* GET Register page. */

module.exports = function(app, passport) {
  app.get('/register', function(req, res, next) {
    res.render('register.ejs', { title: 'Please Register', message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));


};
