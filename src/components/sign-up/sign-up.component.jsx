import React from 'react'
import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

class SignUp extends React.Component {
    constructor(){
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    submitHandler = async (e)=> {
        e.preventDefault()

        //similar to app.js google authentication, except this time manually creating it
        const {displayName, email, password, confirmPassword} = this.state
            //QUESTION: why re-create the state inside this handler?

        if(password !== confirmPassword){
            alert("passwords do not match")
            return
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email, 
                password
            )

            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
        }
        catch(err) {
            console.error(err)
        }
    }

    changeHandler = (e)=> {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }



    render() {
        const {
            displayName, 
            email, 
            password, 
            confirmPassword
        } = this.state

        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with our email and password</span>

                <form 
                    className="sign-up-form"
                    onSubmit={this.submitHandler}
                >
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.changeHandler}
                        label="Display Name"
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.changeHandler}
                        label="Email"
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.changeHandler}
                        label="Password"
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.changeHandler}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type='submit'>
                        Sign Up
                    </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp