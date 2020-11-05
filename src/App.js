import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import StorageService from './services/storageService';
import {connect} from 'react-redux';
import {autoLogin} from './redux/user/user.actions';

class App extends React.Component {

  componentDidMount(){
    const {autoLogin} = this.props;
    autoLogin();
  }

  render(){
    const {currentUser} = this.props;
    console.log(this.state)
    console.log(StorageService.getRegistrationData());
    console.log(StorageService.getLoggedInUserToken());
    //console.log(StorageService.clearLoggedInUserToken());
    return (
       <div>
      <Header />
      <div className="app-container">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin'  render={()=>currentUser? (<Redirect to='/' />): (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    </div>
    );
  }

}
const mapStateToProps = state=>({
  currentUser: state.user.currentUser
})
const mapDispatchToProps = dispatch =>({
  autoLogin:()=>dispatch(autoLogin())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);