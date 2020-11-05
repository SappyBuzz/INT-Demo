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
        
    }   
}