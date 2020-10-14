import React from 'react';

class TilesGrid extends React.Component{
    
    render(){
        return(
            <div className="tilesgrid">                
                <div className="tilesgrid__wrap">
                    <h2>Shop By Categories</h2>
                    <div className="tilesgrid__grid">
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                        <div> <img alt="img" src={require('../assets/category.jpg')}/></div>
                    </div>
                </div>
            </div>
        );    
    }
}
export default TilesGrid;