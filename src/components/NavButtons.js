import React from 'react';
import NavSingleButton from './NavSingleButton';

class NavButtons extends React.Component{
    render(){
        return(
            <div className="navbuttons">
                <div className="navbuttons__wrap">
                    <NavSingleButton link="#login"><i className="fa fa-user"></i> Login/Signup</NavSingleButton>
                    <NavSingleButton link="#cart"><i className="fa fa-shopping-cart"></i> Cart(0)</NavSingleButton>                
                </div>
            </div>
        );
    }
}

export default NavButtons;