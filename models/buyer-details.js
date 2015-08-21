// models/property-details.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var buyerdetailsSchema = mongoose.Schema({

        buyer_name                      : String,
        mailid                          : String,
        age                             : Number,
        phoneno                         : String, 
        job                             : String,
        current_location                : String,
        preferred_location              : [String],
        looking_for                     : [String],
        measurement                     : [String],
        budget                          : [String],
        purpose_of_purchase             : [String],
        tags                            : [String]  

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('buyer_details', buyerdetailsSchema);
