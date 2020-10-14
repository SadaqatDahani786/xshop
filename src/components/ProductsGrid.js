import React from 'react';
import Product from './Product';
class ProductsGrid extends React.Component{
    state = {
        products: [],
        err: ''
    }
    
    componentDidMount(){        
        const url = `http://localhost:4000/getproducts`;
        
        fetch(url).then(res=>{
            return res.json();
        }).then(products=>{
            const productsJx = products.map(prod=>{
                return <Product product={prod}/>
            });            
            this.setState({products: productsJx});
        })
        .catch(err=>{
            // this.setState({err: 'Error! Failed to get products from database.'})      
            console.log("ERRRORORO"+err);
        });
    }

    render(){
        return(
            <div className="productsGrid">
                <div className="productsGrid__wrap">                    
                    <div className="productsGrid__grid">  
                        {this.state.products}
                    </div>
                </div>                
            </div>
        );
    }
}

export default ProductsGrid;