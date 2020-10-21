import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavButtons from './NavButtons';


class Header extends React.Component{

    render(){
        return(
            <header className="header">
                <Logo />
                <SearchBar />
                <NavButtons />
            </header>
        );
    }
}

export default Header;