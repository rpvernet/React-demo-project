import React from "react";

import {NumberLike, LikeDislikeContainer, Button} from "./without-like.styles";


import {ReactComponent as LikeButton} from "../../assets/like.svg"
import {useDispatch} from "react-redux";
import {submitLikeStart} from "../../redux/post/post.actions";
import {like} from "../../App";

type WithoutLikeProps = {
    postId: string,
    likes: [like],
    userId:string,
}


const WithoutLike = ({postId, likes, userId} : WithoutLikeProps) => {

    const dispatch = useDispatch()
    const numberLike : number = likes.length;

    const submitLikePostHandler =  (userId:string, postId:string):void => {
            dispatch(submitLikeStart({userId, postId}))
    };


    const handleLikeClick = ():void => {
         void submitLikePostHandler(userId, postId)
    };
    if(likes !== null) {
        return (
            <div>
            <LikeDislikeContainer>
                <Button>
                    <LikeButton
                        onClick={handleLikeClick}/>
                </Button>
                <NumberLike> {numberLike} </NumberLike>
            </LikeDislikeContainer>
            </div>
        )
    } return <div/>

}

export default WithoutLike;

