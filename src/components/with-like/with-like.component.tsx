import React from "react";

import {NumberLike, LikeDislikeContainer, Button} from "./with-like.styles";

import {ReactComponent as LikedButton} from "../../assets/liked.svg";

import {useDispatch} from "react-redux";
import {deletelikeStart} from "../../redux/post/post.actions";
import {like} from "../../App";

type LikeProps = {
    postId: string,
    likes: [like],
    userId:string,
}


const WithLike = ({postId, likes ,userId}:LikeProps) => {

    const dispatch = useDispatch()

    const numberLike :number= likes.length;

    const submitUnlikePostHandler = (likeId:string, postId:string):void =>{
        void dispatch(deletelikeStart({likeId, postId}))
    };

    const handleUnlikeClick = ():void => {
        const likeId = likes.filter(e => e.userId === userId)
        void submitUnlikePostHandler(likeId[0].likeId, postId)
    };

    if(likes !== null) {
        return (
            <div>
                <LikeDislikeContainer>
                    <Button>
                        <LikedButton onClick={handleUnlikeClick}/>
                    </Button>
                    <NumberLike> {numberLike} </NumberLike>
                </LikeDislikeContainer>
            </div>
        )
    } return <div/>

}

export default WithLike;

