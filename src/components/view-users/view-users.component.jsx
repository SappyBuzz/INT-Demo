import React from 'react';
import {connect} from 'react-redux';

import {getAllUsers} from '../../redux/user/user.actions';
import {withRouter} from 'react-router-dom';
import ApiService from '../../services/apiService';

class ViewUsers extends React.Component{

    constructor(){
        super();
        this.state = {
            allUser:null,
            displayUser:null,
            selectedUser:null
        }
    }

    componentDidMount(){
        const {getAllUsers,match} = this.props;
        const user_id = parseInt(match.params.userId);
        const response = getAllUsers();
        
        if(response){
            this.setState({
                allUser:response
            })
        }
        if(user_id){
            this.setUserDetails(user_id);
        }
    }

    handleChange = (e)=>{
        const userId= parseInt(e.target.value)
        this.setUserDetails(userId);
    }

    setUserDetails(userId){
        const user = ApiService.getUserData(userId);
        console.log(userId)
        if(user && user.length > 0){
            this.setState({
                displayUser:user[0],
                selectedUser:userId
            })
        }
    }

    render(){
        console.log(this.state)
        const {allUser,displayUser,selectedUser} = this.state;
        return(
            <div>
                <div>
                <select name="user" id="user" onChange={this.handleChange} value={selectedUser}>
                    <option value="" hidden>Select User</option>
                    {
                        allUser &&
                        allUser.map(({full_name,id})=>(
                            <option key={id} value={id} >{full_name}</option>
                        ))
                        
                    }
                    
                </select>
                </div>
                {
                    displayUser && 
                    <div>
                    <h3>User Details</h3>
                    <p>Full Name: {displayUser?displayUser.full_name:''}</p>
                    <p>Gender: {displayUser?displayUser.gender:''}</p>
                    <p>Address: {displayUser?displayUser.address:''}</p>
                    <p>Country: {displayUser?displayUser.country:''}</p>
                    <p>Mobile: {displayUser?displayUser.mobile:''}</p>

                </div>
                }
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    getAllUsers:()=>dispatch(getAllUsers())
});
export default withRouter(connect(null,mapDispatchToProps)(ViewUsers));