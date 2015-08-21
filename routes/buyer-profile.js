/* GET buyer-Profile page. */

module.exports = function(app) {
  app.get('/buyer-profile', isLoggedIn, function(req, res, next) {
    res.render('buyer-profile.ejs', {title: "Dashboard", username: req.user.local.username, email: req.user.local.email });
  });

  app.post('/buyer-profile', isLoggedIn, function(req, res, next) {
		// User details
		if(req.body.submit == 'Save Details') {
		  var condition = {"local.email": req.user.local.email};
		  var update = { $set : {"local.username" : req.body.username} };
			var options = {new: true};
			var User = require('../models/user');
			User.findOneAndUpdate(condition, update, options, function(err, user) {
				if(err) {
					console.log('got an error');
				}
				console.log(user);
			  res.redirect('/buyer-profile');
			});
		}

  });


	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

		  // if user is authenticated in the session, carry on 
		  if (req.isAuthenticated())
		      return next();

		  // if they aren't redirect them to the home page
		  res.redirect('/');
	}
};
