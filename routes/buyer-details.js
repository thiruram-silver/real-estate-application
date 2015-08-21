/* GET Buyer-details page. */

module.exports = function(app) {
  app.get('/buyer-details', isLoggedIn, function(req, res, next) {
    res.render('buyer-details.ejs', {title: "Buyer Details" });
  });

  app.post('/buyer-details', isLoggedIn, function(req, res, next) {

    console.log(req.body);

    //load up the property-details model
    var buyer_details = require('../models/buyer-details');
    var buyerform = new buyer_details();
        var tags = [];

        for (var i=0; i<req.body.looking_for.length; i++) {
          tags.push(req.body.looking_for[i]);
        }
        for (var i=0; i<req.body.pre_location.length; i++) {
          tags.push(req.body.pre_location[i]);
        }
        for (var i=0; i<req.body.budget.length; i++) {
          tags.push(req.body.budget[i]);
        }
        tags.push(req.body.measurement);

        buyerform.buyer_name                 = req.body.username;
        buyerform.age                        = req.body.age;
        buyerform.phoneno                    = req.body.phoneno;
        buyerform.mailid                     = req.body.email;
        buyerform.job                        = req.body.job; 
        buyerform.current_location           = req.body.current_location;
        buyerform.looking_for                = req.body.looking_for;
        buyerform.preferred_location         = req.body.pre_location;
        buyerform.measurement                = req.body.measurement;
        buyerform.budget                     = req.body.budget;
        buyerform.purpose_of_purchase        = req.body.purpose_of_purchase;
        buyerform.tags                       = tags; 
 
        buyerform.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir(buyerform);
        });

	  res.redirect('/buyer-details');
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
