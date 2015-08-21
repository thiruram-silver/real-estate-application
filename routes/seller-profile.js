/* GET seller-Profile page. */
var fs  = require("fs");

module.exports = function(app) {
  app.get('/seller-profile', isLoggedIn, function(req, res, next) {

    res.render('seller-profile.ejs', {title: "Dashboard", logo: req.user.local.logo, username: req.user.local.username, email: req.user.local.email });
  });

  app.post('/seller-profile', isLoggedIn, function(req, res, next) {

    //Seller role operations
		//logo
		//delete file before upload
		if(req.user.local.logo) {
		  var file_to_delete = ["./public/uploads/company_logo/"+req.user.local.logo];
			file_to_delete.forEach(function(filename) {
			  fs.unlink(filename);
			});
		}

		var condition = {"local.email": req.user.local.email};
		var update = { $set : {"local.logo" : req.files.company_logo.name}};
		var options = {new: true};
		var User = require('../models/user');
		User.findOneAndUpdate(condition, update, options, function(err, user) {
		  if(err) {
			  console.log('got an error');
			}
			console.log(user);
			res.redirect('/profile');
		});
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
				res.redirect('/profile');
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
