import PostActionTypes from "./post.types";

const INITIAL_STATE = {
    posts:null,
    isFetching: true,
    errorMessage: undefined,
    sortType:'newestFirst'

};

const postReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case PostActionTypes.FETCH_USER_POSTS_START:
        case PostActionTypes.FETCH_POSTS_START:
            return{
                ...state,
                isFetching: true,
                sortType:'newestFirst',
                posts:null
            }

        case PostActionTypes.FETCH_POSTS_SUCCESS:
        case PostActionTypes.FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                posts: action.payload
            }

        case PostActionTypes.FETCH_POSTS_FAILURE:
        case PostActionTypes.FETCH_USER_POSTS_FAILURE:
        case PostActionTypes.FETCH_LIKES_FAILURE:
        case PostActionTypes.FETCH_REPLIES_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        case PostActionTypes.SUBMIT_POST_FAILURE:
            return{
                ...state,
                errorMessage:action.payload
            }
            
        case PostActionTypes.SUBMIT_POST_SUCCESS:
            return{
                ...state,
            }

        case PostActionTypes.SUBMIT_REPLY_TO_POST_SUCCESS:
            return{
                ...state,
                posts: state.posts.map((post) =>
                    post.postId === action.payload.postId ? {
                        ...post,
                            replies :[ ...post.replies, {
                                postId:action.payload.postId,
                                replyContent:action.payload.replyContent,
                                replyId: action.payload.replyId,
                                userId: action.payload.userId,
                                userDisplayName: action.payload.userDisplayName,
                                createdAt:action.payload.createdAt
                                }]}
                        : {...post})
            }

        case PostActionTypes.SUBMIT_LIKE_SUCCESS:
            return{
                ...state,
                posts: state.posts.map((post) =>
                    post.postId === action.payload.postId ? {
                            ...post,
                            likes:[ ...post.likes, {
                                postId:action.payload.postId,
                                likeId: action.payload.likeId,
                                userId: action.payload.userId,
                            }]}
                        : {...post})
            }

        case PostActionTypes.DELETE_LIKE_SUCCESS:
            return{
                ...state,
                posts: state.posts.map((post) =>
                    post.postId === action.payload.postId ? {
                            ...post,
                            likes : [...post.likes.filter(e => e.likeId !== action.payload.likeId)
                            ]}
                        : {...post})
            }

        case PostActionTypes.CHANGE_SORT:
            return{
                ...state,
                sortType: action.payload
            }

        default:
            return state;
    }
};

export default postReducer;