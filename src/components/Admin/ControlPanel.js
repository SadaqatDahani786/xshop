import React from 'react';

import ProductPanel from './ProductPanel';

class ControlPanel extends React.Component{

    state = {
        activePanel : <ProductPanel/>
    }

    handleClick(e){
        e.preventDefault();
        this.setState({activePanel: <ProductPanel/>});
    }

    render(){
        return(
            <div className="">
                <div className="control_panel">
                    <h6 className="control_panel__heading">Admin Panel</h6>
                    <a href="#products" onClick={this.handleClick.bind(this)}>Products</a>                
                </div>
                <div className="active_panel">
                    {this.state.activePanel}
                </div>
            </div>

        );
    }
}

export default ControlPanel;