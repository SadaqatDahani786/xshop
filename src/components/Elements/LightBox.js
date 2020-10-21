import React from 'react';

class LightBox extends React.Component{    
    
    render(){
        return(
            <div className="lightbox" style={{display: this.props.show ? 'block' : 'none'}}>
                <div className="lightbox__overlay" onClick={this.props.callback.bind(this)}></div>
                <div className="lightbox__content">
                    <h4 className="lightbox__content__title">{this.props.title}</h4>
                    {this.props.children}                    
                </div>                
            </div>    

        );
    }
}

export default LightBox;