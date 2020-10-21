import React from 'react';

class Product extends React.Component{

    render(){
        return(
            <div className="product">
                <div className="product__wrap">
                    <div className="product__img">
                        <img src={require('../assets/slider-img-1.jpg')} alt="prodduct"/>
                    </div>
                    <div className="product__details">
                        <div className="product__details__titlebox">
                            <h4>
                                <a href="#d" className="product__titlebox--title">
                                    {this.props.product.product_name}
                                </a>                                
                            </h4>
                        </div>
                        <h6 className="product__details__price">                            
                            {this.props.product.product_price}
                            <i className="fa fa-dollar"></i>
                        </h6>                        
                        <a href="#cart" className="product__details__addtocartbtn">
                            <i className="fa fa-shopping-cart"></i> Add To Cart
                        </a>
                    </div>                     
                </div>                
            </div>
        );
    }
}
export default Product;