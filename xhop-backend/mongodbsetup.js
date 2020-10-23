const mongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://admin:root@cluster0.ovn9u.mongodb.net/xshop-db?retryWrites=true&w=majority";

async function getConnection(){
    const dbClient = new mongoClient(url,{useUnifiedTopology: true});
    return await dbClient.connect();         
}

module.exports = getConnection;