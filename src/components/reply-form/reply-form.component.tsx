import React, {ChangeEvent, FormEvent, useState} from 'react';
import CustomButton from "../custom-button/custom-button.component";
import {useDispatch} from "react-redux";
import {submitReplytoPostStart} from "../../redux/reply/reply.action";

import {StyledReplyTextArea, ReplyFormContainer, ReplyIcon, ReplyIconContainer} from "./reply-form.styles";


import {ReactComponent  as ArrowDown} from "../../assets/Arrow-down.svg";

import {currentUser} from "../../App";

type ReplyFromProps = {
    postId:string,
    currentUser:currentUser
}

type ReplyInfo = {
    replyContent:string
}



const ReplyForm = ({postId, currentUser}:ReplyFromProps) => {

    const dispatch = useDispatch()
    const[reply, setReply] = useState<ReplyInfo>({
        replyContent:''
    });
    const [hidden, setHidden] =  useState(true);
    const  toggleReplyFormHiddenClickHandler = () => {
        setHidden(!hidden)
    }

    const submitReplyClickHandler = (userId:string, userDisplayName:string, postId:string, replyContent:string) =>
        dispatch(submitReplytoPostStart({userId, userDisplayName, postId, replyContent}))

    const handleChange = (event : ChangeEvent<HTMLTextAreaElement>):void => {
        const {name, value} = event.target;
        setReply({...reply, [name]:value});
    }
    const handleSubmit = (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        submitReplyClickHandler(currentUser.userId, currentUser.displayName, postId, reply.replyContent)
        setHidden(true)
    };

    return(
        <ReplyFormContainer>
        <ReplyIconContainer className='reply-icon' onClick={toggleReplyFormHiddenClickHandler}>
            <ReplyIcon>REPLY
                <ArrowDown />
            </ReplyIcon>
        </ReplyIconContainer>
        {
        hidden ? null :
                <form onSubmit={handleSubmit}>
                    <StyledReplyTextArea
                        name='replyContent'
                        onChange={handleChange}
                        required
                    />
                    <CustomButton type='submit'>SUBMIT</CustomButton>
                </form>
        }
        </ReplyFormContainer>
    )
}

export default ReplyForm;