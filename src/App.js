import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage.jsx';
import Cities from './components/Cities/Cities.jsx'
import City from './components/City/City.jsx'
import Packages from './components/Packages/Packages.jsx';
import Experiences from './components/Experiences/Experiences.jsx';
import FilterCities from './components/Filters/FilterCities.jsx';



    function App() {
      return (
        <BrowserRouter>
        <div className="App">    
          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/home"  component={HomePage}/>
            <Route exact path="/cities"  component={Cities}/>
            <Route exact path="/city"  component={City}/>
            <Route exact path="/packages"  component={Packages}/>
            <Route exact path="/experiences"  component={Experiences}/> 
            <Route exact path="/filters"  component={FilterCities}/> 
      
          </Switch>    
        </div>
        </BrowserRouter>
      );
    }
    
    export default App;
