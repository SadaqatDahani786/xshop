import React from 'react';

class Table extends React.Component{
    state = {
        
    }  

    constructor(props){
        super(props);

        console.log(props);        

        const ckstates = props.data.map(prod=>{
            return {                
                '_id': prod['product_id'],
                'checkstate': false
            };
        });           
        this.state['checkboxstates'] = ckstates;
        this.state['products'] = props.data;
        
    }

    componentDidMount(){
        const ckstates = this.props.data.map(prod=>{
            return {                
                '_id': prod['product_id'],
                'checkstate': false
            };
        });   
        const cpy= {...this.state};
        cpy['checkboxstates'] = ckstates;
        cpy['products'] = this.props.data;
        this.setState({checkboxstates: cpy['checkboxstates'],products: cpy['products']});
    }

    // static getDerivedStateFromProps (props,prevstate){
    //     const ckstates = props.data.map(prod=>{
    //         return {                
    //             '_id': prod['product_id'],
    //             'checkstate': false
    //         };
    //     });                        

    //     if(prevstate['checkboxstates'].length > 0){                    
    //         console.log('NOT FIRST TIME, NO CHANGES')
    //         console.log(prevstate['checkboxstates'].length);
    //         return {...prevstate};        
    //     }
    //     else{        
    //         console.log('FIRST TIME, DOING CHANGES');                            
    //         console.log(prevstate['checkboxstates'].length);
    //         return{...prevstate['checkboxstates'] = ckstates};
    //     }               

    // }
    handleChange(e){
        e.preventDefault();        
        const id = e.target.value;
        const index = this.state.checkboxstates.findIndex((cb)=>{
            return cb['_id'] === id;
        });
        
        const cpyCheckboxstates = {...this.state.checkboxstates};
        cpyCheckboxstates[index]['checkstate'] = !cpyCheckboxstates[index]['checkstate'];
        
        this.setState({checkboxstates: [],'n':'haha'},()=>{            
        });
        console.log(cpyCheckboxstates[index]['checkstate']);
    }
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
                    {this.state.products.map((prod,ind)=>{                        
                        return (
                            <tr key={prod.product_name+'\'s tr'}>                                
                                <td> <input type="checkbox" value={this.state.checkboxstates[ind]['_id']} checked={this.state.checkboxstates[ind]['checkstate']} onChange={this.handleChange.bind(this)}/></td>
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