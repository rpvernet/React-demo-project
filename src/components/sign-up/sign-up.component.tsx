import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {signUpStart} from "../../redux/user/user.actions";

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp = () => {
    const dispatch = useDispatch();

    const[userCredentials, setUserCredentials] = useState({
        displayName:'',
        email: '',
        password:'',
        confirmPassword:''
    })

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        if(password.length < 6){
            alert("password has to contain at least 6 character");
            return;
        }

        try{
            dispatch(signUpStart({displayName, email, password}))
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert(error);
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target;

        setUserCredentials({...userCredentials, [name]:value});
        };


        return(
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </SignUpContainer>
        );
}

export default SignUp;

