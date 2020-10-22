import React from 'react';
import Table from '../Elements/Table';
import Button from '../Elements/Button';
import LightBox from '../Elements/LightBox';

class ProductPanel extends React.Component{
    state = {
        products: [],
        categories:[],
        lightboxState: false,
        lightboxTitle : '',
        lightboxBtnTitle: '',
        prodIdsToChange : [],
        formData: {
            name: '',
            stock: '1',
            price: '0.00',
            description: '',
            categories: [],
            featured: false
        }
    }     

    componentDidMount(){
        const url = `http://localhost:5000/getproducts`;
        
        fetch(url).then(res=>{
            return res.json();
        }).then(products=>{            
            this.setState({products: products});
        })
        .catch(err=>{
            // this.setState({err: 'Error! Failed to get products from database.'})      
            console.log(err);
        });        


        //GET CATEGORIES LIST
        const catUrl = 'http://localhost:5000/get_categories_list';
        
        fetch(catUrl).then(res=>{
            return res.json();
        }).then(categories=>{              

            //Categories And CheckBoxState                        
            const arrCat = categories.map(cat=>{                
                return {'_id':cat['_id'],'checkstate':false}; 
            });
            const cpyFormData = {...this.state.formData};
            cpyFormData['categories'] = arrCat;
            this.setState({formData : cpyFormData});                

            //Categories
            this.setState({categories: categories});  
            
            
        })
        .catch(err=>{
            // this.setState({err: 'Error! Failed to get products from database.'})      
            console.log(err);
        });        
    }

    
    /*
    ** ** 
    ** ** ** ADD A NEW PRODUCT 
    ** **
    */        
    handleClickAddOrUpdate(e){        
        e.preventDefault();

        //Rest API Url
        const url = `http://localhost:5000/${this.state.lightboxTitle === 'Add A Product' ? 'insertsingleproduct' : 'updatesingleproduct'}/`;                        
        
        //Filtering Categories
        const cpyFormData = {...this.state.formData};  
        cpyFormData['categories'] = this.state.formData['categories'].filter(cat=>{
            return cat['checkstate'];
        }).map(cat=>{
            return cat['_id'];
        });
        if(this.state.lightboxTitle === 'Update A Product')
            cpyFormData['_id'] = this.state.prodIdsToChange[0];
        //Sending A POST Request To Backend
        fetch(url,{
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type' : 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(cpyFormData)
        })
        .then(res=>{
            return res.json();
        })
        .then(resJson=>{            

            //setting up categories
            let prod = resJson['inserted_product'];            
            const categories = prod['cat_ids'].map(cat=>{
                let index = this.state.categories.findIndex(val=>{
                    return val['_id'] === cat;
                });
                return this.state.categories[index];
            });

            //changing product columns title to new values
            const newProd = {
                'product_categories' : categories,
                'product_description': prod['productDescription'],
                'product_featured': prod['productFeatured'],
                'product_id' : prod['_id'],
                'product_name': prod['productName'],
                'product_price': prod['productPrice'],
                'product_stock': prod['productStock']               
            }            
            
            //Setting new product to the state
            if(this.state.lightboxTitle === 'Add A Product'){
                this.state.products.push(newProd);
            }else{
                const index = this.state.products.findIndex(pr=>{                    
                    return pr.product_id === newProd.product_id;
                });
                const cpyProducts = [...this.state.products];
                cpyProducts[index] = newProd;
                this.setState({products: cpyProducts});
                
            }
            this.setState({'lightboxState': false});

            //Cleanup mess
            this.clearFormData();
            
        })
        .catch(err=>{
            console.log(err);
            // alert('Error! Failed to insert a product, please try again or contact administrator.')
        });

    }

    /*
    ** ** 
    ** ** ** UPDATE A PRODUCT 
    ** **
    */
    handleClickUpdate(e){        
        e.preventDefault();
        // this.setState({lightboxState: true,lightboxTitle: 'Update A Product'});
        
    }
    handleClickDelete(){        
        alert('Delete');
    }
    
    handleChange(idsList){
        this.setState({prodIdsToChange: idsList});      
    }

    /*
    ** **
    ** ** ** Form Data Handler **
    ** **
    */
    handleFormData(e){
        
        const el = e.target;        
        const elVal = e.target.value;
        const cpyFormData = {...this.state.formData};        
        
        //FormValidation
        if(el.name !== undefined && el.name === 'name'){
            cpyFormData['name'] = elVal;
            this.setState({formData: cpyFormData});        
        }        
        else if(el.name !== undefined && el.name === 'stock'){                        
            if(isNaN(parseInt(elVal)))
                cpyFormData['stock'] = ' ';
                this.setState({formData: cpyFormData})                         
            if(parseInt(elVal) >= 0)
                cpyFormData['stock'] = parseInt(e.target.value);
                this.setState({formData: cpyFormData})                                                         
        }
        else if(el.name !== undefined && el.name === 'price'){
            if(isNaN(parseFloat(elVal)))
                cpyFormData['price'] = ' ';
                this.setState({formData: cpyFormData})                         
            if(parseFloat(elVal) >= 0)
                cpyFormData['price'] = parseFloat(e.target.value);
                this.setState({formData: cpyFormData})                                                         
        }
        else if(el.name !== undefined && el.name === 'description'){
            cpyFormData['description'] = elVal;
            this.setState({formData: cpyFormData});        
        }
        else if(el.name === 'categories'){             
            const ind = this.state.formData.categories.findIndex((cat,ind)=>{
                return cat['_id'] === elVal
            });            
            cpyFormData['categories'][ind]['checkstate'] = !this.state.formData.categories[ind]['checkstate'];
            this.setState({formData: cpyFormData});
        }
        else if(el.name !== undefined && el.name === 'featured'){
            cpyFormData['featured'] = !this.state.formData.featured;
            this.setState({formData: cpyFormData});            
        }
        
    }

    /*
    ** **
    ** ** ** Toggle LightBox State **
    ** **
    */
    toggle(e){
        e.preventDefault();   
        this.clearFormData();         
        
        if(e.target.textContent === 'Add Product')
            this.setState({lightboxTitle: 'Add A Product'});
            this.setState({lightboxBtnTitle: 'Add Product'});
        if(e.target.textContent === 'Update Product')
            if(this.state.prodIdsToChange.length <= 0 || this.state.prodIdsToChange.length > 1){
                alert('Select a single product via checkbox to update product.');
                return;
            }
            else if(this.state.prodIdsToChange.length === 1){
                this.setState({lightboxTitle: 'Update A Product'});     
                this.setState({lightboxBtnTitle: 'Update Product'});
                const index = this.state.products.findIndex(currProd=>{
                    return currProd['product_id'] === this.state.prodIdsToChange[0];
                });     
                const cpyFormData = {...this.state.formData};
                const pr = this.state.products[index];
                
                cpyFormData.name = pr['product_name'];
                cpyFormData.price = pr['product_price'];
                cpyFormData.stock = pr['product_stock'];
                cpyFormData.description = pr['product_description'];                
                cpyFormData.categories = cpyFormData.categories.map(cat=>{
                    const ind = pr['product_categories'].findIndex(find=> find['_id'] === cat['_id']);
                    if(ind !== -1){                        
                        cat['checkstate'] = true;
                        return cat;
                    }
                    return cat;
                });
                cpyFormData.featured = pr['product_featured'];

                this.setState({formData: cpyFormData});
            }                
                            
        
        this.setState({lightboxState : !this.state.lightboxState});
    }     
    /*
    ** **
    ** ** ** Clear Form Data **
    ** **
    */
    clearFormData(){                
        const cpyFormData = {...this.state.formData};
        cpyFormData['name'] = ' ';
        cpyFormData['price'] = 0.00;
        cpyFormData['stock'] = 1;
        cpyFormData['description'] = ' ';
        cpyFormData['featured'] = false;
        cpyFormData['categories'] = cpyFormData['categories'].map(cat=>{
            cat['checkstate'] = false;
            return cat;
        });
        this.setState({formData: cpyFormData});
    }
    
    render(){
    
        return(
            <div className="product_panel">
                <Table columnHeadings={['Name','Stock','Price','Description','Categories','Featured']} data={this.state.products} changeHandler={this.handleChange.bind(this)}/>                                
                <Button handleClick={this.toggle.bind(this)}>Add Product</Button>
                <Button handleClick={this.toggle.bind(this)}>Update Product</Button>
                <Button handleClick={this.handleClickDelete.bind(this)}>Delete Product</Button>
                <LightBox title={this.state.lightboxTitle} callback={this.toggle.bind(this)} show={this.state.lightboxState}>
                    <form className="form">
                        
                        <div className="form__group">
                            <label>Name</label>
                            <input type="text" name="name" value={this.state.formData.name} placeholder="" onChange={this.handleFormData.bind(this)}/>                                                
                        </div>                        

                        <div className="form__group">
                            <div className="form__group__multiple">
                                <div className="form__group__multiple--left">
                                    <label>Stock</label>
                                    <input type="number" name="stock" value={this.state.formData.stock} placeholder="" onChange={this.handleFormData.bind(this)}/>                                                
                                </div>
                                <div className="form__group__multiple--right">
                                    <label>Price</label>
                                    <input type="number" name="price" placeholder="" value={this.state.formData.price} onChange={this.handleFormData.bind(this)}/>                                                
                                </div>
                            </div>
                        </div>                        
                        
                        <div className="form__group">
                            <label>Description</label>
                            <textarea name="description" onChange={this.handleFormData.bind(this)} value={this.state.formData.description}></textarea>
                        </div>                        

                        <div className="form__group">
                            <label>Categories</label>                            
                            <div className="form__group__categories">                                                                   
                                {                                                                                                                             
                                    this.state.categories.map((cat,ind)=>{                                                                                                                                                                            
                                        return (                    
                                            <div key={cat['cat_name']} className="form__group__categories__group">
                                                <label className="label-cat-name" htmlFor ={cat['cat_name']} value={cat['_id']}> {cat['cat_name']} </label>
                                                <input id={cat['cat_name']} type="checkbox" checked={this.state.formData['categories'][ind]['checkstate']} name="categories" value={cat['_id']} onChange={this.handleFormData.bind(this)}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>    

                        <div className="form__group">
                            <div className="form__group__checkbox">
                                <label>Featured Product 
                                    <input type="checkbox" name="featured" checked={this.state.formData['featured']} value="true" onChange={this.handleFormData.bind(this)}/>
                                </label>                                
                            </div>                            
                        </div>        
                        
                        <div className="form__group">
                            <div className="form__group__button">
                                <Button handleClick={this.handleClickAddOrUpdate.bind(this)}>
                                    <span className="fa fa-plus"></span> {this.state.lightboxBtnTitle}
                                </Button>
                                <Button handleClick={this.toggle.bind(this)}>
                                    <span className="fa fa-close"></span> Close
                                </Button>
                            </div>
                        </div>                        
                    </form>
                </LightBox>
            </div>
        );
    }
}


export default ProductPanel;

