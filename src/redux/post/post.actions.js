import PostActionTypes from "./post.types";


export const fetchPostsStart = ()=> ({
    type: PostActionTypes.FETCH_POSTS_START
});

export const fetchUserPostsStart = () => ({
    type: PostActionTypes.FETCH_USER_POSTS_START
});

export const fetchPostsSuccess = postsMap => ({
    type: PostActionTypes.FETCH_POSTS_SUCCESS,
    payload: postsMap
});

export const fetchUserPostsSuccess = postsMap => ({
    type: PostActionTypes.FETCH_USER_POSTS_SUCCESS,
    payload: postsMap
});

export const fetchUserPostsFailure = errorMessage => ({
    type: PostActionTypes.FETCH_USER_POSTS_FAILURE,
    payload: errorMessage
});

export const fetchPostsFailure = errorMessage => ({
    type: PostActionTypes.FETCH_POSTS_FAILURE,
    payload: errorMessage
});

export const submitPostStart = userIdandTitleandContentanduserDisplayName => ({
    type: PostActionTypes.SUBMIT_POST_START,
    payload:userIdandTitleandContentanduserDisplayName
});

export const submitPostSuccess = () =>({
    type: PostActionTypes.SUBMIT_POST_SUCCESS
});

export const submitPostFailure = errorMessage =>({
    type: PostActionTypes.SUBMIT_POST_FAILURE,
    payload:errorMessage
});

export const fetchLikesFailure = errorMessage =>({
    type: PostActionTypes.FETCH_LIKES_FAILURE,
    payload:errorMessage
});

export const fetchRepliesFailure = errorMessage =>({
    type: PostActionTypes.FETCH_REPLIES_FAILURE,
    payload:errorMessage
})

export const submitReplyToPostSuccess = userIdandPostIdandReplyContentandReplyId =>({
    type: PostActionTypes.SUBMIT_REPLY_TO_POST_SUCCESS,
    payload: userIdandPostIdandReplyContentandReplyId
});

export const changeSort = sortType => ({
    type: PostActionTypes.CHANGE_SORT,
    payload: sortType
});




export const submitLikeStart = userIdandPostId => ({
    type: PostActionTypes.SUBMIT_LIKE_START,
    payload:userIdandPostId
});

export const submitLikeSuccess = userIdandPostIdandLikeId => ({
    type: PostActionTypes.SUBMIT_LIKE_SUCCESS,
    payload:userIdandPostIdandLikeId
})

export const submitLikeFailure = error =>({
    type: PostActionTypes.SUBMIT_LIKE_FAILURE,
    payload:error
});

export const deletelikeStart = likeIdandPostId => ({
    type: PostActionTypes.DELETE_LIKE_START,
    payload:likeIdandPostId
});

export const deletelikeSuccess = likeIdandPostId => ({
    type: PostActionTypes.DELETE_LIKE_SUCCESS,
    payload:likeIdandPostId
})

export const deletelikeFailure = error =>({
    type: PostActionTypes.DELETE_LIKE_FAILURE,
    payload:error
});
