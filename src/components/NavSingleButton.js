import React from 'react';

class NavSingleButton extends React.Component{
    render(){
        return(
            <a className="navbutton" href={this.props.link}>
                {this.props.children}
            </a>
        );
    }
}

export default NavSingleButton;