// models/property-details.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var propertydetailsSchema = mongoose.Schema({

        seller_name                     : String,
        mailid                          : String,
        age                             : Number,
        phoneno                         : String,
        job                             : String,
        current_location                : String,
        property_location               : String,
        type_of_property                : String,
        measurement                     : String,
        expected_price                  : String,
        reason_for_selling              : String,
        images                          : [String],
        tags                            : [String]

});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('property_details', propertydetailsSchema);
