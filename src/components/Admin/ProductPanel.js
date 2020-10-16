import React from 'react';
import Table from '../Elements/Table';
import Button from '../Elements/Button';
import LightBox from '../Elements/LightBox';

class ProductPanel extends React.Component{
    state = {
        products: [],
        categories:[],
        lightboxState: true,
        formData: {
            name: '',
            stock: '1',
            price: '0.00',
            description: '',
            categories: [],
            featured: false
        },
        categoresListJsx: ''
    }     

    componentDidMount(){
        const url = `http://localhost:4000/getproducts`;
        
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
        const catUrl = 'http://localhost:4000/get_categories_list';
        
        fetch(catUrl).then(res=>{
            return res.json();
        }).then(categories=>{            
            this.setState({categories: categories});  
            
            //Categories And CheckBoxState                        
            const arrCat = categories.map(cat=>{                
                return {'id':cat['_id'],'checkstate':false}; 
            });
            const cpyFormData = {...this.state.formData};
            cpyFormData['categories'].length = 0;
            setTimeout(()=>{                
                this.setState({formData : cpyFormData});
                alert('ran');
            },2000);
        })
        .catch(err=>{
            // this.setState({err: 'Error! Failed to get products from database.'})      
            console.log(err);
        });        
    }

    //Product Panel Buttons Handlers
    handleClickAdd(){        
        this.toggle();
    }
    handleClickUpdate(){        
        alert('Update');
    }
    handleClickDelete(){        
        alert('Delete');
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


    toggle(){
        this.setState({lightboxState : !this.state.lightboxState});
    }
    
    render(){
    
        return(
            <div className="product_panel">
                <Table columnHeadings={['Name','Stock','Price','Description','Categories','Featured']} data={this.state.products}/>                                
                <Button handleClick={this.handleClickAdd.bind(this)}>Add Product</Button>
                <Button handleClick={this.handleClickUpdate.bind(this)}>Update Product</Button>
                <Button handleClick={this.handleClickDelete.bind(this)}>Delete Product</Button>
                <LightBox title={"Add New Product"} callback={this.toggle.bind(this)} show={this.state.lightboxState}>
                    <form className="form">
                        
                        <div className="form__group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="" onChange={this.handleFormData.bind(this)}/>                                                
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
                                        this.state.formData['categories'].push({'_id':cat['_id'],'checkstate':false});                          
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
                                <Button handleClick={this.handleFormData.bind(this)} type="submit">
                                    <span className="fa fa-plus"></span> Add
                                </Button>
                                <Button handleClick={this.toggle.bind(this)} type="submit">
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

