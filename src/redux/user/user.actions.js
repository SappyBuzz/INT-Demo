import {userActionTypes} from './user.types';
import authService from '../../services/authService';

import StorageService from '../../services/storageService';
import apiService from '../../services/apiService';

const setCurrentUser = user =>({
    type:userActionTypes.SET_CURRENT_USER,
    payload:user
})

const seAllUsers = users =>({
    type:userActionTypes.SET_ALL_USERS,
    payload:users
})

export const logOutUser = () => ({type: userActionTypes.LOGOUT_USER})

export const fetchUser = (userInfo) => dispatch => {
    const user = authService.login(userInfo);
    console.log(user)
    if(user.length > 0){
        let userToken = user[0].id;
        StorageService.setLoggedInUserToken(userToken).then(()=>{
            dispatch(setCurrentUser(user[0]))
        })
        return true;
    }else{
        return false;
    }
    
}

export const autoLogin = () => dispatch => {
    if(StorageService.getLoggedInUserToken()){
        const user = apiService.getUserData(StorageService.getLoggedInUserToken());
        if(user.length > 0){
            let userToken = user[0].id;
            StorageService.setLoggedInUserToken(userToken).then(()=>{
                dispatch(setCurrentUser(user[0]))
            })
        }
    }
}


    export const updateUser = (userInfo) => dispatch => {
        const user = apiService.updateUserProfileData(userInfo);
        console.log(user)
        if(user){
            StorageService.setRegistrationData(user).then(()=>{
                dispatch(autoLogin())
            })
            return true;
        }else{
            return false;
        }
        
    }

    export const getAllUsers = () => dispatch => {
        const user = apiService.getAllUsersData();
        console.log(user)
        if(user){
                dispatch(seAllUsers(user))
            return user;
        }else{
            return false;
        }
        
    }
