import React from 'react';

import './form-input.styles.scss';



const FormInput = ({handleChange,handleBlur,label, ...othersInputProps}) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} onBlur={handleBlur} {...othersInputProps} />
        
        {
            label?
            (
            <label className={`${othersInputProps.value.length?'shrink':''} form-input-label `}>{label}</label>
            )
            :
            null
        }
        {
            othersInputProps.error?
            (
                <div className="input-error">{othersInputProps.error}</div>
            )
            :
            null
        }

    </div>
)

export default FormInput;