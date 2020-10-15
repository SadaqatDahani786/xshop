import React from 'react';

class Button extends React.Component{
    render(){
        return(
            <button className="button" onClick={this.props.handleClick.bind(this)}>{this.props.children}</button>
        );
    }
}

export default Button;