import React from 'react';

import './custom-button.styles.scss';


const CustomButton = ({children,isSubmitting, ...otherButtonProps})=>(
    <button className={`custom-button`} disabled={isSubmitting} {...otherButtonProps}>{children}</button>
)

export default CustomButton;