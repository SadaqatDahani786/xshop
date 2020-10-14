import React from 'react';

class SearchBar extends React.Component{
    render(){
        return(
            <div className="searchbar">
                <form className="searchbar__form" action="http://localhost:4000/search" method="get">
                    <input className="searchbar__form--input" type="search" name="search" placeholder="Search our products..."/>
                    <button className="searchbar__form--btn" type="submit"><i className="fa fa-search"></i> Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;