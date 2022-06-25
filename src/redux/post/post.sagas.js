import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import PostActionTypes from "./post.types";
import {
    fetchPostsSuccess, fetchUserPostsSuccess, fetchPostsFailure, fetchUserPostsFailure, submitPostFailure,
    submitPostSuccess, fetchLikesFailure, fetchRepliesFailure, submitLikeSuccess, submitLikeFailure, deletelikeSuccess
}
    from "./post.actions";

import {convertPostSnapShotToMap, createPost, firestore} from "../../firebase/firebase.utils";
import {collection, getDocs, query, where, orderBy, collectionGroup} from "firebase/firestore";
import {likeSubmit, unlikeSubmit} from "../../firebase/like.utils";

export const getUserData = (state) => state.user

export function* getLikeSnapshot(){
    try{
        const likeQuery = yield collectionGroup(firestore, 'like');
        return yield getDocs(likeQuery);
    }catch(error){
        yield put(fetchLikesFailure(error));
    }
}

export function* getRepliesSnapShot(){
    try{
    const repliesQuery = yield collectionGroup(firestore, 'reply');
     return yield getDocs(repliesQuery);
    }catch(error){
        yield put(fetchRepliesFailure(error))
    }
}

export function* fetchPostsAsync() {
  try{
      const postRef = collection(firestore,'post' );
      const q = yield query(postRef,orderBy("createdAt", "desc")) ;
      const postsSnapShot = yield getDocs(q);
      const likesSnapShot = yield call(getLikeSnapshot);
      const repliesSnapShot = yield call(getRepliesSnapShot);
      const postsMap = yield call(convertPostSnapShotToMap, postsSnapShot, likesSnapShot, repliesSnapShot)
      yield put(fetchPostsSuccess(postsMap));
  }catch(error){
      yield put(fetchPostsFailure(error));
  }
}

export function* fetchUserPostsAsync() {
    try{
        let userState = yield select(getUserData);
        const postRef = collection(firestore, 'post');
        const q = yield query(postRef, where("userId", "==", userState.currentUser.userId),
            orderBy("createdAt", "desc"));
        const postsSnapshot = yield getDocs(q);
        const likesSnapShot = yield call(getLikeSnapshot);
        const repliesSnapShot = yield call(getRepliesSnapShot);
        const userPostsMap = yield call(convertPostSnapShotToMap, postsSnapshot, likesSnapShot, repliesSnapShot)
        yield put(fetchUserPostsSuccess(userPostsMap));
    }catch(error){
        yield put(fetchUserPostsFailure(error));

    }
}

export function* fetchPostsStart(){
   yield (takeLatest(PostActionTypes.FETCH_POSTS_START, fetchPostsAsync));
}

export function* fetchUserPostsStart(){
    yield (takeLatest(PostActionTypes.FETCH_USER_POSTS_START, fetchUserPostsAsync));
}

export function* submitPost({payload: {userId, postTitle, postContent, userDisplayName}}){
    try{
        yield createPost(userId, postTitle, postContent, userDisplayName);
        yield put(submitPostSuccess());
    }catch (error){
        yield put(submitPostFailure(error));
    }
}

export function* submitLike({payload: {userId, postId}}){
    try{
        const likeId = yield likeSubmit(userId, postId);
        yield put(submitLikeSuccess({userId, postId, likeId}))
    }catch (error){
        yield put(submitLikeFailure(error))
    }
}

export function* deleteLike({payload:{likeId, postId}}){
    try{
        yield unlikeSubmit(likeId, postId);
        yield put(deletelikeSuccess({likeId, postId}))
    }catch(error){
        yield put(submitLikeFailure(error))
    }
}

export function* onSubmitPostStart(){
    yield takeLatest(PostActionTypes.SUBMIT_POST_START, submitPost)
}

export function* onSubmitLikeStart(){
    yield takeLatest(PostActionTypes.SUBMIT_LIKE_START, submitLike)
}

export function* onDeleteLikeStart(){
    yield takeLatest(PostActionTypes.DELETE_LIKE_START, deleteLike)
}

export function* postSagas(){
    yield all([
        call(fetchPostsStart),
        call(fetchUserPostsStart),
        call(onSubmitPostStart),
        call(onSubmitLikeStart),
        call(onDeleteLikeStart)
    ])
}