import {ReplyActionTypes} from "./reply.types";


export const submitReplytoPostStart = userIdanduserDisplayNameandPostIdandReplyContent => ({
    type: ReplyActionTypes.SUBMIT_REPLY_TO_POST_START,
    payload:userIdanduserDisplayNameandPostIdandReplyContent
});

export const submitReplyToPostFailure = error =>({
    type: ReplyActionTypes.SUBMIT_REPLY_TO_POST_FAIL,
    payload:error
});

