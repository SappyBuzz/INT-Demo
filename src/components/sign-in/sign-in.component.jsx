import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import './sign-in.component.styles.scss';
import {connect} from 'react-redux';
import FromInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';
import StorageService from '../../services/storageService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {tostConfig} from '../../tostConfig';
import {fetchUser} from '../../redux/user/user.actions';


class SignIn extends React.Component{

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign In with your user id and password</span>

                <Formik
            initialValues={{userId:"",password:""}}
            validationSchema={Yup.object().shape({
                userId: Yup.string()
                    .required('User Id is required'),
                password: Yup.string()
                    .required('Password is required'),
            })}
            
            onSubmit={(values,{resetForm })=>{
                console.log( this.props)
                const {fetchUser} = this.props;
                if(!StorageService.getLoggedInUserToken()){
                    if(StorageService.getRegistrationData()){
                        const actionResponse = fetchUser(values);
                            if(actionResponse){
                                resetForm();
                                toast(`Logged In Successfully.`, tostConfig);
                            }else{
                                toast(`User Id and Password is Not Match.`, tostConfig);
                            }
                    }else{
                        toast(`No Registered User Found. Please Signup.`, tostConfig);
                    }   
                }else{
                    toast(`Already Logged In.`, tostConfig);
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
                    name="userId"
                    value={values.userId}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="User Id"
                    error={errors.userId?errors.userId:''}
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
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                    </div>
                    
                </form>
                )}

                </Formik>
                <ToastContainer />
            </div>
        )
    }
}

// const mapStateToProps = state =>({
//     currentUser:state.user.currentUser
// });

const mapDispatchToProps = dispatch =>({
    fetchUser:(userInfo)=>dispatch(fetchUser(userInfo))
});



export default connect(null,mapDispatchToProps)(SignIn);