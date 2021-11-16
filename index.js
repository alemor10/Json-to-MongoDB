// var arr = require('./data').arr;
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb+srv://alemor10:coolkids1@aleworld-kqemh.mongodb.net/test?authSource=admin&replicaSet=aleWORLD-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"; // Your mongodb url here


const axios = require('axios');
const pokemon = require('pokemontcgsdk');
const fs = require('fs');



pokemon.configure({apiKey: '89e242cc-48fc-407e-8abf-77fd2f8e65e6'});

const DB = 'TheTradingFloor'

const yugiohArgs = {
  cardData: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
  collection: 'YugiohCards',
}

const pokemonArgs = {
  cardSets: 'https://api.pokemontcg.io/v2/sets',
  collection: 'PokemonCards'
}

async function uploadYugiohCards(url, collectionName) {
  try {
      const response = await axios.get(url);
      const data = response.data.data
      client = await MongoClient.connect(dburl); 

      const dbo =  await client.db(DB);
      const addedCards =  data.map( async (card) => {
        const res = await dbo.collection(collectionName).insertOne(card)
        return res;
      })
      console.log(addedCards)
      const res = await  Promise.all(addedCards);
      client.close();
      console.log(res)
      return "Success";
  } catch(err) {
    console.log(err);
  }
}

async function getPokemonSets(url) {
  try {
    const data = await axios.get(url);

    const pokemonSets = data.data.data


    const allPokemonSetsInfo = pokemonSets.map(( set )=> {
      

      const { id,  total } = set;

      const res = {
        setID: id,
        totalCards: total,
        uploaded: 0,
        cards: []
      }

      for(let i=1; i <= total; i++ ) {
        res.cards.push(`${id}-${i}`)
      }

      return res;


    }).sort();

    const jsonString = JSON.stringify(allPokemonSetsInfo)
    
    fs.writeFile('./pokemonCardsStatus.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })

  
  } catch(err) {
    console.log(err);
  }
}


async function getPokemonCardsByArray(collectionName) {
  client = await MongoClient.connect(dburl); 

  const dbo =  await client.db('scrubcardshop');
  fs.readFile('./pokemonCardsStatus.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    const pokemonSets = JSON.parse(jsonString);


    const uploadedCards = pokemonSets.slice(2,4).map( async(set) => {
      
      const cardData = set.cards.map( (card)  => {
        
        const cardResult = pokemon.card.find(card)
        return cardResult;
      })

      const rawData = await Promise.all(cardData)


      const uploadedCardsToDB = rawData.map( async(card) => {
        const res = await dbo.collection(collectionName).insertOne(card);
        set.uploaded += 1;
        return res;
      })

      const dataUploaded = await Promise.all(uploadedCardsToDB);
      client.close();

      console.log(dataUploaded, set.uploaded, set.total);
      return dataUploaded
    })
    
    
  })
}

uploadYugiohCards(yugiohArgs.cardData, yugiohArgs.collection);

// getPokemonSets(pokemonArgs.cardSets);

// getPokemonCardsByArray(pokemonArgs.collection)