import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () =>(
    <div className="side-menu">
        <Link className="logo-container" to="/profile">
            My Profile
        </Link>
        <br />
        <Link className="logo-container" to="/user-list">
            User List
        </Link>
        <br />
        <Link className="logo-container" to="/users">
           View Users
        </Link>
    </div>
)

export default SideMenu;

