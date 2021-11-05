import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import ContactState from './components/context/contact/ContactState';
import './App.css';

const App = () => {
  return (
    <ContactState>
    <Router>
          <Fragment className="App">
      <Navbar/>
      <div className='container'>
      <Switch>
        {/* url "/" renders <Home/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
      </div>
    </Fragment>
    </Router>
    </ContactState>
  );
}

export default App;
