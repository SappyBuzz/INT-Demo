import StorageService from './storageService';

export default{

    login(CREDENTIALS){
        try{
            let formData = StorageService.getRegistrationData();
    
           return formData.filter(obj =>(
            obj.userId === CREDENTIALS.userId && obj.password === CREDENTIALS.password
            ))
        }
        catch(e){
            console.log(e);
        }
         
    }
   
}
