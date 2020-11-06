import React from 'react';
import {connect} from 'react-redux';

import {getAllUsers} from '../../redux/user/user.actions';
import {withRouter} from 'react-router-dom';

class UserList extends React.Component{

    constructor(){
        super();
        this.state = {
            users:null
        }
    }

    componentDidMount(){
        console.log(this.props)
        const {getAllUsers} = this.props;

        const response = getAllUsers();
        if(response){
            this.setState({
                users:response
            })
        }
    }
    render(){
        console.log('dcsvdsvsdvsdvs'+this.state.users)
        const {users} = this.state;
        let html = users?users.map(elm=>(
        <tr key={elm.id}>
            <td>{elm.full_name}</td>
            <td>{elm.country}</td>
            <td>{elm.mobile}</td>
            <td>
                <button onClick={()=>this.props.history.push(`/users/${elm.id}`)}>View</button>
                <button onClick={()=>this.props.history.push(`/edit-user/${elm.id}`)}>Edit</button>
            </td>
        </tr>
            ))
            :<tr><td colSpan="2">No Data Found</td></tr>
            // 
        return(
            <div>
                <table>
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>Country</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    
                        
                   {html}


                </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    getAllUsers:()=>dispatch(getAllUsers())
});

export default withRouter(connect(null,mapDispatchToProps)(UserList));