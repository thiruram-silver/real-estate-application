/* GET buyer-Search page. */

module.exports = function(app) {
  var base_queryone = 0, base_querytwo = 0;

  app.get('/buyer-search', isLoggedIn, function(req, res, next) {
    res.render('buyer-search.ejs', {title: "Search", seller: base_queryone});
  });

  app.post('/buyer-search', isLoggedIn, function(req, res, next) {

    console.log(req.body);

		var queryone = require('../models/property-details');

    condition = {"tags":{$all : [req.body.looking_for, req.body.pre_location, req.body.measurement, req.body.budget]}};

		queryone.find(condition, function(err, base_queryone) {
		  if(err) {
		    console.log('got an error');
		  }
        
      res.render('buyer-search.ejs', {title: "search", seller: base_queryone}); 
		});

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
