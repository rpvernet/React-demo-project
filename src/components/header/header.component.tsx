import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {selectCurrentUser} from "../../redux/user/user.selectors";
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";

import { ReactComponent as Logo } from '../../assets/potato.svg'

const Header = () => {

    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const signOutStartClickHandler = () => {
        dispatch(signOutStart());
    };

return(
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        { currentUser ? (
        <OptionsContainer>
            <OptionLink to='/create-post'>
                CREATE POST
            </OptionLink>
            <OptionLink to='/user-posts'>
                MY POSTS
            </OptionLink>
            <OptionLink to='/all-posts'>
                ALL POSTS
            </OptionLink>
            <OptionLink to='/' onClick={signOutStartClickHandler}>SIGN OUT</OptionLink>
        </OptionsContainer>
            ) : (<OptionsContainer/>)

        }
    </HeaderContainer>
)};

export default Header;