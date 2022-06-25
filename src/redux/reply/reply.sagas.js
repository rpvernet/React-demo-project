import { takeLatest, call, put, all} from 'redux-saga/effects';
import {ReplyActionTypes} from "./reply.types";
import {createReply} from "../../firebase/reply.utils";
import {submitReplyToPostSuccess} from "../post/post.actions"
import {Timestamp} from "firebase/firestore";

export function* submitReply({payload: {userId, userDisplayName, postId, replyContent}}){
    try{
        const createdAt = Timestamp.now()
        const replyId = yield createReply(userId, userDisplayName, postId, replyContent, createdAt);
        const userIdanduserDisplayNameandPostIdandReplyContentandcreatedAt =
            {userId, userDisplayName, postId, replyContent, replyId, createdAt}
        yield put(submitReplyToPostSuccess(userIdanduserDisplayNameandPostIdandReplyContentandcreatedAt))

    }catch (error) {
        console.log('error creating reply', error.message)
    }
}


export function* onSubmitReplytoPostStart(){
    yield takeLatest(ReplyActionTypes.SUBMIT_REPLY_TO_POST_START, submitReply)
}



export function* replySagas(){
    yield all([
        call(onSubmitReplytoPostStart)
    ])
}


