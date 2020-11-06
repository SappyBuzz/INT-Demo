import {userActionTypes} from './user.types';
import storageService from '../../services/storageService';


const INITIAL_STATE={
    currentUser:null
}

const userReducer = (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case userActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
            }
        case userActionTypes.LOGOUT_USER:
            storageService.clearLoggedInUserToken();
            return{
                currentUser:null
            }
        case userActionTypes.SET_ALL_USERS:
            return{
                ...state,
                allUsers:action.payload
            }
        default:
            return state;
    }
}

export default userReducer;