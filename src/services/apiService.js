import StorageService from './storageService';


export default {
    getUserData(TOKEN){
        try{
           let formData = StorageService.getRegistrationData();
    
            return formData.filter(obj =>(
                obj.id === TOKEN
            )) 
        }
        catch(e){
            console.log(e);
        }
        
    },   

    updateUserProfileData(userInfo){
        try{
            let formData = StorageService.getRegistrationData();
           return formData.map(obj =>
            obj.id === userInfo.id ? {...obj,...userInfo}:obj
            )
        }
        catch(e){
            console.log(e);
        }
         
    },
    getAllUsersData(){
        try{
           let formData = StorageService.getRegistrationData();
           const id = StorageService.getLoggedInUserToken();
    
            return formData.filter(obj =>(
                obj.id !== id
            )) 
        }
        catch(e){
            console.log(e);
        }
        
    }
}