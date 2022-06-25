import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {submitPostStart} from "../../redux/post/post.actions";
import React, {useState, ChangeEvent, FormEvent} from "react";
import {Redirect} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {PostFormContainer, StyledTextArea, FormTest, TextAreaLabel} from "./post-form.styles";
import {currentUser} from "../../App";

type PostInfo = {
    postTitle:string,
    postContent:string;
    redirectToUserPost:boolean
}

const PostForm = () => {

    const currentUser:currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();

    const submitPostClickHandler = (userId:string, postTitle:string, postContent:string, userDisplayName:string) =>
        dispatch(submitPostStart({userId, postTitle, postContent, userDisplayName}));

    const[postInfo, setPostInfo] = useState<PostInfo>({
        postTitle:'',
        postContent:'',
        redirectToUserPost:false
    });

    const redirectToUserPost = postInfo.redirectToUserPost;
    if (redirectToUserPost){
        return <Redirect to='/user-posts'/>
    }

    const {postTitle, postContent} = postInfo;

    const handleChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>):void => {
        const {name, value} = event.target;
        setPostInfo({...postInfo, [name]:value});
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>):Promise<any> => {
        event.preventDefault();
        const userId = currentUser.userId;
        const userDisplayName = currentUser.displayName;
        submitPostClickHandler(userId, postTitle, postContent, userDisplayName);
        setPostInfo({
            postTitle:postTitle,
            postContent:postContent,
            redirectToUserPost:true})
    }



    return(
    <PostFormContainer>
            <FormTest className='post-form' onSubmit={handleSubmit} >
                <FormInput
                    type='text'
                    name='postTitle'
                    value={postTitle}
                    onChange={handleChange}
                    label='Title'
                    required 
                />
                <TextAreaLabel htmlFor='StyledTextArea'>Post Content</TextAreaLabel>
                <StyledTextArea
                    name='postContent'
                    value={postContent}
                    onChange={handleChange}
                    required
                />
                <CustomButton type='submit'>SUBMIT</CustomButton>
            </FormTest>
    </PostFormContainer>


    );
}

export default PostForm;