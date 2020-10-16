import React from 'react';

class Table extends React.Component{
    render(){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th className="check-column"><input type="checkbox"/></th>
                        {this.props.columnHeadings.map(heading=>{
                            return (<th key={heading}>{heading}</th>)
                        })}
                    </tr>                        
                </thead>
                <tbody>                                            
                    {this.props.data.map(prod=>{
                        return (
                            <tr key={prod.product_name+'\'s tr'}>
                                <td> <input type="checkbox"/></td>
                                <td> {prod.product_name}</td>
                                <td> {prod.product_stock}</td>
                                <td> {prod.product_price}</td>
                                <td> {prod.product_description}</td>
                                <td>{
                                    prod.product_categories.map((cat,ind)=>{
                                        return (ind === (prod.product_categories.length-1) ? cat['cat_name'] : cat['cat_name']+', ');
                                    })}
                                </td>
                                <td>{prod.product_featured.toString()}</td>
                            </tr>
                        );
                        })}                    
                                          
                </tbody>                    
            </table>                
        );
    }
}

export default Table;