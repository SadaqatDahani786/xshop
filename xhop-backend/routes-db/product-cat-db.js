const dbConnection = require('../mongodbsetup');
const ObjectId = require('mongodb')['ObjectId'];

/*
** **
** ** * GET CATEGORY BY _ID
** **
*/
async function getCategoryByID(cat_ids,dbconnection){
    let db = dbconnection;   
    let connection; 
    try{
        if(db === undefined || db === null){
            connection = await dbConnection();
            db = connection.db();
        }        
        
        const resultCategories = await db.collection('categories').find({'_id':{'$in' : cat_ids}});
        const categories = [];
        while(await resultCategories.hasNext()){
            categories.push(await resultCategories.next());
        }               
        return categories;        
    }catch(err){
        return err;
    }
}


/*
** **
** ** * GET ALL CATEGORIES
** **
*/
async function getCategoriesList(dbconnection){
    let db = dbconnection;   
    let connection; 
    try{
        if(db === undefined || db === null){
            connection = await dbConnection();
            db = connection.db();
        }   
        const resultCategories = await db.collection('categories').find({});
        const categories = [];
        while(await resultCategories.hasNext()){
            categories.push(await resultCategories.next());
        }               
        return categories;        
    }catch(err){
        return err;
    }
}



module.exports.getCategoryByID = getCategoryByID;
module.exports.getCategoriesList = getCategoriesList;