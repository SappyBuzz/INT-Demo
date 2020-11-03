import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';


class App extends React.Component {

  constructor(){
    super();

  }

  render(){
    return (
       <div>
      <Header />
      <div className="app-container">
        <Switch>
          <Route exact path='/' component={HomePage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
        </Switch>
      </div>
    </div>
    );
  }

}

export default App;
