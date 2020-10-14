import React from 'react';
import './sass/App.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

/*
 ** **
 ** ** * XSHOP - COMPONENTS
 ** ** 
 */
import Header from './components/Header';
import Slider from './components/Slider';
import SectionProducts from './components/SectionProducts';
import TilesGrid from './components/TilesGrid';

function App() {
  return (
    <div className="App">
      <Header/>
      <Slider/>
      {/* <SectionProducts title={"Latest Products"} bg={''}/>
      <SectionProducts title={"Men's Fashion"} bg={require('./assets/slider-img-1.jpg').toString()}/> */}
      <SectionProducts title={"Women's Fashion"} bg={require('./assets/slider-img-1.jpg').toString()}/>
      <TilesGrid/>
      <SectionProducts title={"Men's Fashion"} bg={require('./assets/slider-img-1.jpg').toString()}/>
    </div>
  );
}

export default App;
