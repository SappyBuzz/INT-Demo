import React from 'react';
import {connect} from 'react-redux';
import './header.styles.scss';
import { Link } from 'react-router-dom';



const Header = ()=>(
    <div className="header">
        <Link className="logo-container" to="/">
            INT DEMO
        </Link>
        <div className="options">
           
                <div className="option" >SIGN OUT</div>
                
                <Link className="option" to="/signin">
                    SIGN IN
                </Link>
          
            
        </div>
    </div>

);


export default Header;
