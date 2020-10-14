import React from 'react';
import ProductsGrid from './ProductsGrid';

class SectionProducts extends React.Component{
    render(){
        return(
            <div className="sectionproducts" style={{backgroundImage: `url(${this.props.bg})`}}>
                <h2>{this.props.title}</h2>
                <ProductsGrid/>
            </div>
        );
    }
}

export default SectionProducts;