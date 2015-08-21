/* GET Property-details page. */

module.exports = function(app) {
  app.get('/property-details', isLoggedIn, function(req, res, next) {
    res.render('property-details.ejs', {title: "Property Details" });
  });

  app.post('/property-details', isLoggedIn, function(req, res, next) {

    console.log(req.body);

    //load up the property-details model
    var property_details = require('../models/property-details');
    var proform = new property_details();
        var images = [];
        var tags   = []; 
        tags.push(req.body.type_of_property,req.body.pro_location,req.body.measurement_of_property,req.body.expected_price_for_property)
        proform.seller_name                = req.body.username;
        proform.age                        = req.body.age;
        proform.phoneno                    = req.body.phoneno;
        proform.mailid                     = req.body.email;
        proform.job                        = req.body.job; 
        proform.current_location           = req.body.current_location;
        proform.property_location          = req.body.pro_location;
        proform.type_of_property           = req.body.type_of_property;
        proform.measurement                = req.body.measurement_of_property;
        proform.expected_price             = req.body.expected_price_for_property;
        proform.reason_for_selling         = req.body.reason_for_selling;
        for(var i=0; i<req.files.property_image.length; i++) {
          images.push(req.files.property_image[i].name);
        }
        proform.images = images;
        proform.tags   = tags;
 
        proform.save(function(err, thor) {
          if (err) return console.error(err);
          console.dir(proform);
        });

	  res.redirect('/property-details');
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
