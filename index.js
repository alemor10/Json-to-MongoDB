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



