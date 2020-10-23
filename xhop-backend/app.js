const express = require('express');
const app = express();
const bodyparser = require('body-parser');


const routerProduct = require('./routes/products');
const routerCategories = require('./routes/product-cat');


/**
 * **
 * ** * SETTING CORS HEADER TO ALLOW BROWSER 
 * **
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

/**
 * **
 * ** * SETTING UP BODY_PARSER
 * **
 */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


/**
 * **
 * ** * SETTING UP ROUTES & ROUTERS
 * **
 */
app.use(routerProduct);
app.use(routerCategories);

app.get('/search',(req,res)=>{
    res.write("<h1>Hello From Node</h1>");
    res.send();
});


/**
 * **
 * ** * RUNNING UP WEB SERVER AT PORT 4000
 * **
 */
app.listen(5000,()=>{
    console.log("Server is running...");
});