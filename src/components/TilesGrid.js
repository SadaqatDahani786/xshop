import React from 'react';

class TilesGrid extends React.Component{
    
    state = {
        categories: []
    }

    componentDidMount(){
        const url = 'http://localhost:4000/get_categories_list';

        fetch(url)
        .then(resJson=>{
            return resJson.json();
        })
        .then(categories=>{
            const categoriesJx = categories.map(cat=>{
                return <div><img alt="img" src={require('../assets/category.jpg')}/> {cat['cat_name']} </div>;
            });            
            this.setState({categories: categoriesJx});
        })
        .catch(err=>{
            console.log(err);
        });
    }
    
    render(){
        return(
            <div className="tilesgrid">                
                <div className="tilesgrid__wrap">
                    <h2>Shop By Categories</h2>
                    <div className="tilesgrid__grid">
                        {this.state.categories}                        
                    </div>
                </div>
            </div>
        );    
    }
}
export default TilesGrid;