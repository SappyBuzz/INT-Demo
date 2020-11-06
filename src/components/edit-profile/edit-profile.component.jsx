import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FromInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import StorageService from '../../services/storageService';
import ApiService from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import './edit-profile.styles.scss';
import {withRouter} from 'react-router-dom';
import {tostConfig} from '../../tostConfig';

import {updateUser} from '../../redux/user/user.actions';

class EditProfile extends React.Component{
    constructor(){
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        const {match} = this.props;
        const user_id = parseInt(match.params.userId);
        if(user_id){
            this.setProfileData(user_id);
        }else if(StorageService.getLoggedInUserToken()){
            this.setProfileData(StorageService.getLoggedInUserToken());
        }
    }

    setProfileData(userId){
        const userData = ApiService.getUserData(userId);
        console.log(userData)
            if(userData && userData.length > 0 ){
                this.setState({
                    user: userData[0]
                })
            }
    }


    render(){
        const {user} = this.state;
        
        return(
            <div className="sign-up">
                {
                    (user)?
                <Formik
            initialValues={Object.assign({},user,{confirm_password:''})}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .required('First name is required'),
                last_name: Yup.string()
                    .required('Last name is required'),
                gender: Yup.string()
                .required('Gender is required'),
                address:Yup.string()
                .required('Address is required'),
                country:Yup.string()
                .required('City is required'),
                mobile:Yup.string()
                .required('Mobile number is required')
                .matches(new RegExp('[0-9]{10}'),'Please enter valid 10 digits mobile number')
                .min(10, 'Please enter valid 10 digits mobile number')
                .max(10, 'Please enter valid 10 digits mobile number'),
                password: Yup.string().required("Password is required"),
                confirm_password: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={(values,{resetForm })=>{
                values.id = user.id;
                values.full_name = values.middle_name?`${values.first_name} ${values.middle_name} ${values.last_name}`: `${values.first_name} ${values.last_name}`;
                values.display_name = `${values.first_name} ${values.last_name}`;
                const res =  ApiService.updateUserProfileData(values);

                const {updateUser} = this.props;
                if(StorageService.getLoggedInUserToken()){
                    if(StorageService.getRegistrationData()){
                        const actionResponse = updateUser(values);
                            if(actionResponse){
                                toast(`User Updated Successfully.`, tostConfig);
                            }else{
                                toast(`User Update Failed.`, tostConfig);
                            }
                    }else{
                        toast(`No Registered User Found. Please Signup.`, tostConfig);
                    }   
                }else{
                    toast(`Please Log In.`, tostConfig);
                }
 

    
            }}
            >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit})=>(

                    <form onSubmit={handleSubmit}>
                    <FromInput 
                    type="text"
                    name="first_name"
                    value={values.first_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="First Name"
                    error={errors.first_name?errors.first_name:''}
                    />
                    <FromInput 
                    type="text"
                    name="middle_name"
                    value={values.middle_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Middle Name"
                    error=""
                    />
                    <FromInput 
                    type="text"
                    name="last_name"
                    value={values.last_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Last Name"
                    error={errors.last_name?errors.last_name:''}
                    />
                    <div className="group">
                        <label className="outer-label">Gender</label>
                        <input 
                        id="male"
                        type="radio" 
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultChecked={values.gender=== "Male"}
                        className={errors.gender && touched.gender && "error"}
                         /> Male
                        <input 
                        id="female"
                        type="radio" 
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultChecked={values.gender=== "Female"}
                        className={errors.gender && touched.gender && "error"}
                         /> Female
                         {errors.gender  && (<div className="input-error">{errors.gender}</div>)}
                    </div>

                    <div className="group">
                    <label className="outer-label">Address</label>
                    <textarea
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="text-area"
                    />
                    {errors.address  && (<div className="input-error">{errors.address}</div>)}
                    </div>
                    <FromInput 
                    type="text"
                    name="country"
                    value={values.country}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Country"
                    error={errors.country?errors.country:''}
                    />
                    <FromInput 
                    type="text"
                    name="mobile"
                    value={values.mobile}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Mobile"
                    error={errors.mobile?errors.mobile:''}
                    />
                    <FromInput 
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Password"
                    error={errors.password?errors.password:''}
                    />
                    <FromInput 
                    type="password"
                    name="confirm_password"
                    value={values.confirm_password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Confirm Password"
                    error={errors.confirm_password?errors.confirm_password:''}
                    />


                    <div className="buttons">
                        <CustomButton type="submit" isSubmitting={isSubmitting}>Edit</CustomButton>

                    </div>
                    
                </form>
                 )}
 
                    

                 </Formik> : <div>Loading...</div>
    }
                 <ToastContainer />
            </div>
            

        );
    }

}

const mapDispatchToProps = dispatch =>({
    updateUser:(userInfo)=>dispatch(updateUser(userInfo))
});


export default withRouter(connect(null,mapDispatchToProps)(EditProfile));