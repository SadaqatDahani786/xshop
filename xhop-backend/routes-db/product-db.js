const dbConnection = require('../mongodbsetup');
const ObjectId = require('mongodb')['ObjectId'];
const categoryHandler = require('./product-cat-db');


/*
** **
** ** ** GET ALL PRODUCTS
** **
*/
async function getAllProducts(){
    let db;   
    let connection; 
    try{
        connection = await dbConnection();
        db = connection.db();
        const result = await db.collection('products').find({});
        const products = [];
        while(await result.hasNext()){
            products.push(await result.next());
        }
        
        //Getting Categories
        const categories = [];
        const finalProductsList = [];
        for(let i = 0; i < products.length; i++){
            categories.push(await categoryHandler.getCategoryByID(products[i]['cat_ids'],db));
            finalProductsList.push(
                {
                    'product_id': products[i]['_id'],
                    'product_name': products[i]['productName'],
                    'product_price': products[i]['productPrice'],
                    'product_stock': products[i]['productStock'],
                    'product_description': products[i]['productDescription'],
                    'product_featured': products[i]['productFeatured'],
                    'product_categories': categories[i]                    
                }
            );
        }                                  
        return finalProductsList;
    }catch(err){
        console.log(err);
        return err;
    }finally{
        connection.close();
        console.log('CONNECTION TO SERVER CLOSED');
    }
}

/*
** **
** ** ** GET PRODUCTS IN CATEGORY
** **
*/
async function getProductsByCategory(prodID){
    let db;   
    let connection; 
    try{
        connection = await dbConnection();
        db = connection.db();
        const result = await db.collection('products').find({'cat_ids':new ObjectId(prodID)});
        const products = [];        
        while(await result.hasNext()){
            products.push(await result.next());
        }        
        
        // Getting Categories
        const categories = [];
        const finalProductsList = [];
        for(let i = 0; i < products.length; i++){
            categories.push(await categoryHandler.getCategoryByID(products[i]['cat_ids'],db));
            finalProductsList.push(
                {
                    'product_id': products[i]['_id'],
                    'product_name': products[i]['productName'],
                    'product_price': products[i]['productPrice'],
                    'Product_Categories': categories[i]
                }
            );
        }      
                               
        return finalProductsList;
    }catch(err){
        console.log(err);
        return err;
    }finally{
        connection.close();
        console.log('CONNECTION TO SERVER CLOSED');
    }
}


/*
** **
** ** ** INSERT A SINGLE PRODUCT
** **
*/
async function insertSingleProduct(product){
    let db;   
    let connection; 
    try{
        connection = await dbConnection();        
        db = connection.db();        
        const updatedProduct = {
            productName: product['name'],
            productPrice: product['price'],
            cat_ids: product['categories'].map(cat=> new ObjectId(cat)),
            productStock: product['stock'],
            productDescription: product['description'],                
            productFeatured: product['featured']
        };
        const result = await db.collection('products').insertOne(updatedProduct);
        updatedProduct.product_id = result['insertedId'];
        return {'inserted_product': updatedProduct, 'insert_count': result['insertedCount']};    
        
    }catch(err){        
        return err;
    }finally{
        connection.close();
    }
}

/*
** **
** ** ** UPDATE A SINGLE PRODUCT
** **
*/
async function updateSingleProduct(product){
    let db;
    let connection;    
    try{
        connection = await dbConnection();
        db = connection.db();
        const updatedProduct = {            
            productName: product['name'],
            productPrice: product['price'],
            cat_ids: product['categories'].map(cat=> new ObjectId(cat)),
            productStock: product['stock'],
            productDescription: product['description'],                
            productFeatured: product['featured']
        };
        const result = await db.collection('products').updateOne({'_id': new ObjectId(product._id)},{$set: updatedProduct});
        updatedProduct['_id']  = product._id;        
        return {'inserted_product': updatedProduct, 'modifiedCount': result['modifiedCount']};
    }
    catch(err){
        return err;
    }
    finally{
        connection.close();
    }
}


/*
** **
** ** ** DELETE PRODUCTS
** **
*/
async function deleteProducts(ids){
    let db;
    let connection;
    const objIds = ids.map(id=> new ObjectId(id));
    try{
        connection = await dbConnection();
        db = connection.db();
        
        const result = await db.collection('products').deleteMany({'_id': {'$in': objIds}});
        // console.log(result);
        return {deletedCount:result.deletedCount,'deletedProductIds': ids};
    }
    catch(err){
        return err;
    }
    finally{
        connection.close();
    }
}


module.exports.getAllProducts = getAllProducts;
module.exports.getProductsByCategory = getProductsByCategory;
module.exports.insertSingleProduct = insertSingleProduct;
module.exports.updateSingleProduct = updateSingleProduct;
module.exports.deleteProducts = deleteProducts;