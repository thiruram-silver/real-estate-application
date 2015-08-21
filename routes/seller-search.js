/* GET seller-Search page. */

var doc       = require('msexcel-builder');
var glob      = require("glob");

module.exports = function(app) {
  var base_queryone = 0, base_querytwo = 0;

  app.get('/seller-search', isLoggedIn, function(req, res, next) {
    var id = req.user.local.id;
    glob("./public/doc/"+id+"_*.xlsx", function (er, exfile) {
      res.render('seller-search.ejs', {title: "Search", buyer: base_querytwo, doc_id: exfile });
    });
  });

  app.post('/seller-search', isLoggedIn, function(req, res, next) {

    if(req.body.submitsellersearch == 'search') {
			var queryone = require('../models/buyer-details');

		  condition = {"tags":{$all : [req.body.looking_for, req.body.pre_location, req.body.measurement, req.body.budget]}};

			queryone.find(condition, function(err, base_queryone) {
				if(err) {
				  console.log('got an error');
				}

            //MSexcel Builder excel generator
            // Create a new workbook file in current working-path
            var date = new Date();
            str_id = req.user.local.id;
            var workbook = doc.createWorkbook('./public/doc', str_id+'_'+date.getDate()+'_'+date.getMonth()+'_'+date.getFullYear()+'.xlsx');

            // Create a new worksheet with 10 columns and 12 rows
            var sheet1 = workbook.createSheet('sheet1',10 , base_queryone.length+2); 
            // Fill some data
            var col_header    = ['Buyer Name','Phone No','E-mail','Preferred Location','Measurement','Budget','Looking for'];
            for (var i = 1; i < 8 ; i++)
              sheet1.set(i, 1, col_header[i-1]);

            for(var y=0;y<base_queryone.length;y++) {
              sheet1.set(1, y+2, base_queryone[y].buyer_name);
              sheet1.set(2, y+2, base_queryone[y].phoneno);
              sheet1.set(3, y+2, base_queryone[y].mailid);
              sheet1.set(4, y+2, base_queryone[y].preferred_location);
              sheet1.set(5, y+2, base_queryone[y].Measurement);
              sheet1.set(6, y+2, base_queryone[y].budget);
              sheet1.set(7, y+2, base_queryone[y].looking_for);
            }

            // Save it
            workbook.save(function(ok){
            if (!ok)
              return workbook.cancel();
            });

            var id = req.user.local.id;
            glob("./public/doc/"+id+"_*.xlsx", function (er, exfile) {

		        res.render('seller-search.ejs', {title: "search", buyer: base_queryone, doc_id: exfile });
            });
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
