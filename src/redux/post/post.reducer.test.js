import PostActionTypes from "./post.types";
import postReducer from "./post.reducer";


const INITIAL_STATE = {
    posts:null,
    isFetching: true,
    errorMessage: undefined,
    sortType:'newestFirst'

};

const mockPosts = [{
    userId:1234,
    postId:1231,
    postTitle:'hello',
    postContent:'Hello this is test',
    likes: [{
        userId:1234,
        likeId:222
    },
        {
            userId:1235,
            likeId:223
        }
    ],
    replies:[]
}]

describe('postReducer', () => {


    it('should return initial state', () => {
        expect(postReducer(undefined,{})).toEqual(INITIAL_STATE);
        expect(postReducer(INITIAL_STATE,{
            type:PostActionTypes.SUBMIT_POST_SUCCESS
        })).toEqual(INITIAL_STATE);
    })

    const INITIAL_STATE_FETCHING= {
        posts:null,
        isFetching: false,
        errorMessage: undefined,
        sortType:'newestFirst'
    };

    it('should return initial state and isFetching stay to true', () =>{
        expect(postReducer(INITIAL_STATE_FETCHING, {
            type:PostActionTypes.FETCH_USER_POSTS_START})).toEqual(INITIAL_STATE)

        expect(postReducer(INITIAL_STATE_FETCHING, {
            type:PostActionTypes.FETCH_POSTS_START})).toEqual(INITIAL_STATE)
    });

    it('should set posts to payload after fetch and put isFetching to false', () => {

        expect(postReducer(INITIAL_STATE,{
            type:PostActionTypes.FETCH_POSTS_SUCCESS,
            payload:mockPosts
        })).toEqual({
            posts: mockPosts,
            isFetching: false,
            errorMessage: undefined,
            sortType:'newestFirst'
        })

        expect(postReducer(INITIAL_STATE,{
            type:PostActionTypes.FETCH_USER_POSTS_SUCCESS,
            payload:mockPosts
        })).toEqual({
            posts: mockPosts,
            isFetching: false,
            errorMessage: undefined,
            sortType:'newestFirst'
        })
    })

    it('should set errorMessage to payload on fetchPostsFailure, fetchLikesFailure, fetchRepliesFailure', () =>
        {
            const mockError = {
                message:'mock errored',
                code: 404 }

            expect(postReducer(INITIAL_STATE, {
                type:PostActionTypes.FETCH_POSTS_FAILURE,
                payload:mockError
            }).errorMessage
            ).toBe(mockError);

            expect(postReducer(INITIAL_STATE, {
                    type:PostActionTypes.FETCH_USER_POSTS_FAILURE,
                    payload:mockError
                }).errorMessage
            ).toBe(mockError);

            expect(postReducer(INITIAL_STATE, {
                    type:PostActionTypes.FETCH_LIKES_FAILURE,
                    payload:mockError
                }).errorMessage
            ).toBe(mockError);

            expect(postReducer(INITIAL_STATE, {
                    type:PostActionTypes.FETCH_REPLIES_FAILURE,
                    payload:mockError
                }).errorMessage
            ).toBe(mockError);

            expect(postReducer(INITIAL_STATE, {
                    type:PostActionTypes.SUBMIT_POST_FAILURE,
                    payload:mockError
                }).errorMessage
            ).toBe(mockError);
        })

    it('should add payload to posts', () =>
        {
            const mockReply = {
                postId:1231,
                replyContent:'Hello hello',
                replyId: 5553,
                userId: 4321,
                userDisplayName: 'Cathy',
                createdAt:'2022-02-05'
            }
            const mockPostWithReply = [{
                userId:1234,
                postId:1231,
                postTitle:'hello',
                postContent:'Hello this is test',
                likes: [{
                    userId:1234,
                    likeId:222
                },
                    {
                        userId:1235,
                        likeId:223
                    }
                ],
                replies:[{
                    postId:1231,
                    replyContent:'Hello hello',
                    replyId: 5553,
                    userId: 4321,
                    userDisplayName: 'Cathy',
                    createdAt:'2022-02-05'
                }]
            }]

            expect(postReducer({
                posts:mockPosts,
            },{
                type:PostActionTypes.SUBMIT_REPLY_TO_POST_SUCCESS,
                payload:mockReply
                }).posts).toEqual(mockPostWithReply);
        })

    it('should put sortType to the payload Value', () =>{

        const mockSortType = 'oldestFirst';

        expect(postReducer(INITIAL_STATE, {
                type:PostActionTypes.CHANGE_SORT,
                payload:mockSortType
            }).sortType
        ).toBe(mockSortType);
    })
})