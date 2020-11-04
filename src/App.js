import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import StorageService from './services/storageService';

class App extends React.Component {

  constructor(){
    super();

  }

  render(){
    console.log(StorageService.clearRegistrationData())
    console.log(StorageService.getRegistrationData())
    return (
       <div>
      <Header />
      <div className="app-container">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    </div>
    );
  }

}

export default App;
