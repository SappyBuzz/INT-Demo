import React from 'react';
import {connect} from 'react-redux';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import {logOutUser} from '../../redux/user/user.actions';



const Header = ({currentUser,logOutUser})=>(
    <div className="header">
        <Link className="logo-container" to="/">
            INT DEMO
        </Link>
        <div className="options">
            {
                currentUser?
                (
                    <React.Fragment>
                        <div className="option">{currentUser.display_name}</div>
                        <div className="option" onClick={logOutUser}>SIGN OUT</div>
                    </React.Fragment>
                    
                )
                :
                (
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                )
            }
        </div>
    </div>

);

const mapStateToProps = state=>({
    currentUser:state.user.currentUser
})

const mapDispatchToProps = dispatch =>({
    logOutUser:()=>dispatch(logOutUser())
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);
