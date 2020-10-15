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
import AdminControlPanel from './components/Admin/ControlPanel';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  
  const MenCatID = '5f81cb7017caad8f504b6bb1';
  const WomenCatID = '5f81cc2517caad8f504b6bb2';
  
  return (
    <div className="App">
      <Router>
        <Switch>          
          {/* ADMIN */}
          <Route path="/admin">
            <Header/>
            <AdminControlPanel/>            
          </Route>
        
          {/* HOME*/}
          <Route path="/">
            <Header/>
            <Slider/>      
            <SectionProducts title={"Men's Fashion"} bg={require('./assets/slider-img-1.jpg').toString()} catID={MenCatID}/>
            <TilesGrid/>
            <SectionProducts title={"Women's Fashion"} bg={require('./assets/slider-img-1.jpg').toString()} catID={WomenCatID}/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
