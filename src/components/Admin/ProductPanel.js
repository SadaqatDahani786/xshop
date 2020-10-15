import React from 'react';
import Table from '../Elements/Table';
import Button from '../Elements/Button';
import LightBox from '../Elements/LightBox';

class ProductPanel extends React.Component{
    state = {
        products: [],
        lightboxState: true
    }

    componentDidMount(){
        const url = `http://localhost:4000/getproducts`;
        
        fetch(url).then(res=>{
            return res.json();
        }).then(products=>{            
            console.log(products);
            this.setState({products: products});
        })
        .catch(err=>{
            // this.setState({err: 'Error! Failed to get products from database.'})      
            console.log(err);
        });        
    }

    handleClickAdd(){        
        this.toggle();
    }
    handleClickUpdate(){        
        alert('Update');
    }
    handleClickDelete(){        
        alert('Delete');
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
                            <input type="text" name="name" placeholder=""/>                                                
                        </div>                        

                        <div className="form__group">
                            <div className="form__group__multiple">
                                <div className="form__group__multiple--left">
                                    <label>Stock</label>
                                    <input type="number" name="stock" placeholder=""/>                                                
                                </div>
                                <div className="form__group__multiple--right">
                                    <label>Price</label>
                                    <input type="number" name="price" placeholder=""/>                                                
                                </div>
                            </div>
                        </div>                        
                        
                        <div className="form__group">
                            <label>Description</label>
                            <textarea></textarea>
                        </div>                        

                        <div className="form__group">
                            <label>Categories</label>
                            <input type="text" name="name" placeholder=""/>                                                
                        </div>    

                        <div className="form__group">
                            <div className="checkbox">
                                <label>Featured Product 
                                    <input type="checkbox" name="featured" value="true"/>
                                </label>                                
                            </div>                            
                        </div>        

                    </form>
                </LightBox>
            </div>
        );
    }
}


export default ProductPanel;

