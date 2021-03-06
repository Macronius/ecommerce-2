import React from 'react'
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component.jsx'
import CustomButton from '../custom-button/custom-button.component.jsx'

import {auth, signInWithGoogle} from '../../firebase/firebase.utils.js'

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            email: '',
            password: '',
        }
    }

    submitHandler = async (e)=> {
        e.preventDefault()

        const {email, password} = this.state

        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState( {email: '', password: ''} )
        }
        catch(err){
            console.log(err)
        }

    }

    changeHandler = (e)=> {
        const {name, value} = e.target
        this.setState( {[name]: value} )
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.submitHandler}>
                    <FormInput 
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.changeHandler}
                        label="email"
                        required 
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.changeHandler}
                        label="password"
                        required 
                    />
                    <div className="buttons">
                        <CustomButton type="submit">
                            Sign in 
                        </CustomButton>
                        <CustomButton 
                            type="button"
                            onClick={signInWithGoogle} 
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>           
            </div>
        )
    }
}

export default SignIn