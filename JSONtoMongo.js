'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    listingData;


/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
mongoose.connect(config.db.uri, {useCreateIndex: true, useNewUrlParser:true});


var connection = mongoose.connection;
connection.on('connected', function(){
    console.log('connected to db');
})

connection.on('disconnected', function(){
    console.log('disconnected to db');
})
connection.on('error', function(error){
    console.log('db connection error', error);
})
process.on('SIGINT', function(){
  connection.close(function(){
      console.log('db connection closed due to process termination');
      process.exit(0);
  });
});
module.exports = connection;
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
 //var place = mongoose.model('Place', s);
 fs.readFile('listings.json', 'utf8', function(err,data){
   if (err) throw err;


   JSON.parse(data).entries.forEach(function (l){
     var place= new Listing({
       code: l.code,
       name: l.name,
       coordinates:{
         latitude: l.latitude,
         longitude: l.longitude
       },
       address: l.address
     })
     place.save(function(err){
       if(err) throw err
     });
   });
 });






/*
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
