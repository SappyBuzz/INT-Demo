import {userActionTypes} from './user.types';
import authService from '../../services/authService';

import StorageService from '../../services/storageService';
import apiService from '../../services/apiService';

const setCurrentUser = user =>({
    type:userActionTypes.SET_CURRENT_USER,
    payload:user
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