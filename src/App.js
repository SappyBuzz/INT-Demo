import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Dashboard from './pages/dashboard/dashboard.component';
import StorageService from './services/storageService';
import {connect} from 'react-redux';
import {autoLogin} from './redux/user/user.actions';
import MyProfile from './pages/my-profile/my-profile.component';
import UserList from './pages/user-list/user-list.component';

import ViewUsers from './components/view-users/view-users.component';

import PrivateRoute from './private-route/private-route';

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
          <Route path='/signin'  render={()=>currentUser? (<Redirect to='/dashboard' />): (<SignInAndSignUpPage />)} />

          <PrivateRoute path='/dashboard' component={Dashboard} currentUser={currentUser} />
          <PrivateRoute path='/profile' component={MyProfile} currentUser={currentUser} />
          <PrivateRoute path='/user-list' component={UserList} currentUser={currentUser} />
          <PrivateRoute path='/edit-user/:userId' component={MyProfile} currentUser={currentUser} />
          <PrivateRoute exact={true} path='/users' component={ViewUsers} currentUser={currentUser} />
          <PrivateRoute path='/users/:userId' component={ViewUsers} currentUser={currentUser} />
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