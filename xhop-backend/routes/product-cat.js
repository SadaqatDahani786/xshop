const express = require('express');
const router = express.Router();
const categoryDB = require('../routes-db/product-cat-db');


router.get('/get_categories_list',(req,res)=>{
    
    categoryDB.getCategoriesList().then((catsList)=>{
        res.json(catsList);
    }).catch(err=>{
        res.json(err);
    });
    
});


module.exports = router;














module.exports = router;