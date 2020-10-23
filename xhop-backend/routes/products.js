const express = require('express');
const router = express.Router();
const productDB = require('../routes-db/product-db');



/*
** **
** ** ** GET ALL PRODUCTS
** **
*/
router.get('/getproducts',(req,res)=>{
    productDB.getAllProducts().then((prods)=>{        
        res.json(prods);        
    }).catch(err=>{        
        res.json(err);
    });  
});


/*
** **
** ** ** GET PRODUCTS IN CATEGORY
** **
*/
router.get('/getproductsbycat:prodID',(req,res)=>{
    const prodID = req.params.prodID;
    productDB.getProductsByCategory(prodID).then((prods)=>{
        res.json(prods);        
    }).catch(err=>{        
        res.json(err);
    });  
});

/*
** **
** ** ** INSERT A SINGLE PRODUCT
** **
*/

router.post('/insertsingleproduct/', (req,res)=>{
    console.log('INSERT PRODUCT');
    const prod = req.body;    
    productDB.insertSingleProduct(prod).then(result=>{
        return res.json(result);
    }).catch(err=>{    
        if(err)            
            return res.sendStatus(500);
    });    
});

/*
** **
** ** ** UPDATE A SINGLE PRODUCT
** **
*/
router.post('/updatesingleproduct',(req,res)=>{
    console.log('UPDATE PRODUCT');
    const prod = req.body;
    productDB.updateSingleProduct(prod).then(result=>{
        return res.json(result);
    }).catch(err=>{
        console.log(err);
    });
});

/*
** **
** ** ** DELETE PRODUCTS
** **
*/
router.delete('/deleteproducts/:ids',(req,res)=>{
    const ids = req.params.ids;
    if(ids){
        const ids = req.params.ids.split(',');    
        const result = productDB.deleteProducts(ids).then(result=>{            
            res.json(result);
        }).catch(err=>{
            console.log(err);
        });        
    }else{
        res.status(300).send();
    }
});



module.exports = router;