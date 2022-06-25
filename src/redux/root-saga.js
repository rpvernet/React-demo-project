import {all, call} from 'redux-saga/effects';

import {userSagas} from "./user/user.saga";
import {postSagas} from "./post/post.sagas";
import {replySagas} from "./reply/reply.sagas";


export default function* rootSaga(){
    yield all([
        call(userSagas),
        call(postSagas),
        call(replySagas)

    ])

}