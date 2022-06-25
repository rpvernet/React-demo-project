import React from 'react';

import ReplyForm from "../reply-form/reply-form.component";
import Reply from "../reply/reply.component";

import {LikeDislikeContainer, PostContent, DateP, PostTitle, PostContainer, DiplayName} from "./post.styles";
import WithLike from "../with-like/with-like.component";
import WithoutLike from "../without-like/without-like.component";

import {post, currentUser} from "../../App";


type PostProps = {
    key:string,
    post:post,
    currentUser:currentUser
}

const Post = ({post, currentUser} : PostProps) => {

    const {postTitle, postContent, createdAt, replies, postId, likes, userDisplayName} = post;
    const {userId} = currentUser;

    if(post!=null){
    return(
        <PostContainer>
            <PostTitle>{postTitle}</PostTitle>
            <DateP>{new Date(createdAt.seconds * 1000).toLocaleDateString("en-US")}</DateP>
            <DiplayName>by {userDisplayName}</DiplayName>
            <PostContent>{postContent}</PostContent>
            <LikeDislikeContainer>
                {
                    likes.some(e => e.userId === userId) ?
                        <WithLike postId={postId} likes={likes} userId={userId}/>:
                        <WithoutLike postId={postId} likes={likes} userId={userId}/>
                }
            </LikeDislikeContainer>
            {
                replies.map((reply) => <Reply key={reply.replyId} reply={reply}/>
                )
            }
            <ReplyForm postId={postId} currentUser={currentUser}/>
         </PostContainer>
    )
    }
    return <div/>
}

export default Post;