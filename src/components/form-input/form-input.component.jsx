import React from 'react'
import './form-input.styles.scss'

const FormInput = ({changeHandler, label, ...otherProps})=> {
    return(
        <div className="group">
            <input className="form-input" onChange={changeHandler} {...otherProps}  />
            {
                label ? 
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>
                : null
            }
        </div>
    )
}

export default FormInput


/*
NOTE:
the reason for the handleChange destructure here, is because we want to bubble-up any onChange that the input has, but we're going to wrap our whole component in a group because because we want the label and the input to be together

NOTE:
null is a great way for nothing to occur

NOTE:
label will always have 'form-input-label' class, but if the user has ever typed anything in, then it will also have the 'shrink' class as well (for the purpose of those browser that offer an 'auto-complete' feature)
*/