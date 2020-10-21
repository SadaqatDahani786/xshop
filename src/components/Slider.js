import React from 'react';

class Slider extends React.Component{
    state = {
        slides: {
            sliderImgs: [require('../assets/slider-img-1.jpg'),require('../assets/slider-img-1.jpg'),require('../assets/slider-img-1.jpg')]
        },
        sliderCurrIndex: 0,
        sliderImgWidth: 0,
        sliderID: 0
    }

    componentDidMount(){
        const ID = setInterval(()=>{
            this.setState({sliderCurrIndex: this.state.sliderCurrIndex+1 > 2 ? 0 : this.state.sliderCurrIndex + 1});
        },5000);
        this.setState({sliderID : ID});
    }

    componentWillUnmount(){
        clearInterval(this.state.sliderID);
    }

    imageLoadHandle(event){        
        this.setState({sliderImgWidth: event.target.offsetWidth});
    }

    render(){        
        return(
            <div className="slider">
                <div className="slider__container" style={{transform: `translateX( ${ -(this.state.sliderImgWidth * this.state.sliderCurrIndex)}px)`}}>                    
                    {this.state.slides.sliderImgs.map((imgUrl,index) => {
                        return (
                        <div className="slider__slides">
                            <img src={imgUrl} alt={imgUrl+index} onLoad={this.imageLoadHandle.bind(this)} />
                        </div>
                        );
                    })}                    
                </div>
            </div>
        );
    }
}

export default Slider;