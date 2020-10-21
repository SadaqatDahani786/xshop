import React from 'react';
import LogoImg from '../assets/logo.png';

class Logo extends React.Component{
    render(){
        return(
            <div className="logo">
                <img src={LogoImg} className="logo__img" alt="logo"/>
            </div>
        );
    }
}

export default Logo;