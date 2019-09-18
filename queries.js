/* Add all the required libraries*/
var config = require('./config'),
    mongoose = require('mongoose')
    Listing = require('./ListingSchema.js');
/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useCreateIndex: true, useNewUrlParser:true});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function( ) {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   Listing.findOne({name:'Library West'}).exec().then((place)=>{
       console.log(place)

   }).catch((err)=>{
     throw err
   });

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   Listing.findOne({code:'CABL'}).exec().then((place)=>{
        console.log(place)

    }).catch((err)=>{
      throw err
    });
   Listing.deleteOne({code:'CABL'}).exec().then(function(){
     console.log("Removed CABL");
   }).catch((err)=>{
     throw err
   });

};
var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then
    log the updated document to the console.

    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
    Listing.findOneAndUpdate({name: 'Phelps Laboratory'}, {
     $set :{address: '1953 Museum Rd, Gainesville, FL 32603'}
   }, {new:true}).exec().then((place)=>{
     console.log(place);
   }).catch((err)=>{
     throw err
   });

};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   Listing.find().exec().then((place)=>{
     place.forEach((place)=>{
       console.log(place)
     });
   }).catch((err)=>{
     throw err
   });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
