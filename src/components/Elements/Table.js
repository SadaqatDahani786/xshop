import React from 'react';

class Table extends React.Component{
    state = {
        checkboxstates : [],
        products: []
    }  

    static getDerivedStateFromProps(props, state) {
        if(state.checkboxstates.length < props.data.length){                        
            return {checkboxstates : []};            
        }        
        return null;
    }    

    handleChange(e){

        //Checking For Checkbox All
        if(e.target.name === 'ckbox-all'){
            const updatedState = this.state.checkboxstates.map(ck=>{
                ck['checkstate'] = e.target.checked === true ? true : false;
                return ck;
            });
            this.setState({checkboxstates: updatedState});
                        
        }else{

            //Find The Index OF Checkbox
            const id = e.target.value;
            const index = this.state.checkboxstates.findIndex((cb)=>{
                return cb['_id'] === id;
            });       

            //Making a copy and doing the change
            const cpyCheckboxstates = [...this.state.checkboxstates];
            cpyCheckboxstates[index]['checkstate'] = !cpyCheckboxstates[index]['checkstate'];
            
            //Updating the state with new value
            this.setState({checkboxstates: cpyCheckboxstates});      

        }

        //Calling callback and sending data back to parent
        const dataToSend = this.state.checkboxstates.filter((ckstate)=>{
            return ckstate['checkstate']; 
        }).map(ck=> ck['_id']);
        this.props.changeHandler(dataToSend);
    }
    render(){                
        
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th className="check-column"><input type="checkbox" name="ckbox-all" onChange={this.handleChange.bind(this)}/></th>
                        {this.props.columnHeadings.map(heading=>{
                            return (<th key={heading}>{heading}</th>)
                        })}
                    </tr>                        
                </thead>
                <tbody>                                            
                    {this.props.data.map((prod,ind)=>{                        
                        
                        //Preparing states for Checkbox to use                        
                        if(this.state.checkboxstates.length < this.props.data.length){
                            // if(ind === 0)                            
                            this.state.checkboxstates.push({
                                '_id': prod['product_id'],
                                'checkstate': false
                            });
 
                        }
                                                
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