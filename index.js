import {firestoreExport} from 'node-firestore-import-export';
import * as firebase from 'firebase-admin';

firebase.initializeApp({
    apiKey: "AIzaSyDzQXtTTw-_WMF6YhYqU-ygJDKkGGtHHUo",
    authDomain: "scrubcardshop.firebaseapp.com",
    databaseURL: "https://scrubcardshop.firebaseio.com",
    projectId: "scrubcardshop",
    storageBucket: "scrubcardshop.appspot.com",
    messagingSenderId: "257241716666",
    appId: "1:257241716666:web:79df45e6125c4699172f83",
    measurementId: "G-MTQPD6N9M3"           
});

const collectionRef = firebase.firestore().collection('collectionA/docB/collectionC');

firestoreExport(collectionRef)
    .then(data=>console.log(data));


    var arr = require('./data').arr;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/"; // Your mongodb url here
    
    
    for (i = 0; i < 2; i++) { 
      console.log(arr[i]);
    }
    
    
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("scrubcardshop");
      for ( i =0; i < arr.length; i++) {
        
        dbo.collection("yugiohcards").insert(arr[i], function(err, res) {
          
        if (err) throw err;
          
        console.log("The document got inserted.");
          
          
        });       
      }
        
      db.close();
    });
