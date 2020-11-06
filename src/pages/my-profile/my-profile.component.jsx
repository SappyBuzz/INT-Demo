import React from 'react';
import './my-profile.styles.scss';
import EditProfile from '../../components/edit-profile/edit-profile.component';


const MyProfile = ({heading})=>(
    <div className="sign-in-and-sign-up">
        {heading?(<div>{heading}</div>):(<div>My Profile</div>)}
        <EditProfile />
    </div>
    
);

export default MyProfile;