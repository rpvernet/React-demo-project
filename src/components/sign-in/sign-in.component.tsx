import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch} from "react-redux";

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import FormInput from "../form-input/form-input.component";
import CustomButton, {BUTTON_TYPE_CLASSES} from "../custom-button/custom-button.component";


import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

const SignIn = () =>  {
    const dispatch = useDispatch();
    const googleSignInClickHandler = () => dispatch(googleSignInStart());
    const [userCredentials, setCredentials] = useState ({email:'', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{

        const {email, password} = userCredentials;
        dispatch(emailSignInStart({email, password}))
        }catch(error){
            console.log('user sign in fail', error)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {value, name} = event.target;

        setCredentials({...userCredentials, [name]:value})
    };


        return(
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        onChange={handleChange}
                        value={email}
                        label='email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        onChange={handleChange}
                        label='password'
                        required
                    />
                    <ButtonsBarContainer>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={googleSignInClickHandler}
                                      type='button'
                                      buttonType={BUTTON_TYPE_CLASSES.google}>
                            Sign in with Google
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        )

}


export default SignIn;