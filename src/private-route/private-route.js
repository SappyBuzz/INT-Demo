import {Route, Switch, Redirect} from 'react-router-dom';
const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {
    console.log(currentUser)
    return <Route {...rest} render={(props) => (
        currentUser? 
            <Component {...props} />
            : <Redirect to='/signin' />
        )} 
    />
}

export default PrivateRoute;