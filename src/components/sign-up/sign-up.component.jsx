import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FromInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import StorageService from '../../services/storageService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './sign-up.styles.scss';



class SignUp extends React.Component{


    render(){
        return(
            <div className="sign-up">
                <h2 className="titel">I do not have an account</h2>
                <span>Sign up</span>
                <Formik
            initialValues={{first_name:"",middle_name:"",last_name:"",full_name:"",display_name:"",gender:"",address:"",country:"",mobile:""}}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .required('First name is required'),
                last_name: Yup.string()
                    .required('Last name is required'),
                full_name: Yup.string()
                    .required('Full name is required'),
                display_name: Yup.string()
                    .required('Display name is required'),
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
            })}
            
            onSubmit={(values,{resetForm })=>{
         
                values.id = Date.now(); 
                values.userId = `INT_${values.first_name}${values.last_name}`;
                values.password = `INT_${StorageService.encription(Date.now(),'90IU!@11')}`;

                if(StorageService.getRegistrationData()){
                    let formData = StorageService.getRegistrationData();
                    formData.push(values);
                    StorageService.setRegistrationData(formData).then(()=>{
                        console.log(`User ID: ${values.userId} Password: ${values.password}`);
                        resetForm();
                        toast(`Registration Successful.`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            });
                    })
                    
                }else{
                    let formData= [];
                    formData.push(values);
                    StorageService.setRegistrationData(formData).then(()=>{
                        console.log(`User ID: ${values.userId} Password: ${values.password}`);
                        resetForm();
                        toast(`Registration Successful.`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: false,
                            progress: undefined,
                            });
                    })
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
                    <FromInput 
                    type="text"
                    name="full_name"
                    value={values.full_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Full Name"
                    error={errors.full_name?errors.full_name:''}
                    />
                    <FromInput 
                    type="text"
                    name="display_name"
                    value={values.display_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Display Name"
                    error={errors.display_name?errors.display_name:''}
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



                    <div className="buttons">
                        <CustomButton type="submit">Sign Up</CustomButton>

                    </div>
                    
                </form>
                 )}
 
                    

                 </Formik>
                 <ToastContainer />
            </div>
            

        );
    }

}

export default SignUp;