// var arr = require('./data').arr;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; // Your mongodb url here


const axios = require('axios');

let data = [];
axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(function (response) {
    data = response.data.data;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("scrubcardshop");
          
      for ( i =0; i < data.length; i++) {
            
          dbo.collection("yugiohcards").insert(data[i], function(err, res) {
              
            if (err) throw err;
              
            console.log("The document got inserted.");
              
              
          });       
      }
            
      db.close();
    });
  })
  .catch(function (err) {
    console.log(err);
  })


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("scrubcardshop");
      
  for ( i =0; i < data.length; i++) {
        
      dbo.collection("yugiohcards").insert(data[i], function(err, res) {
          
        if (err) throw err;
          
        console.log("The document got inserted.");
          
          
      });       
  }
        
  db.close();
});
