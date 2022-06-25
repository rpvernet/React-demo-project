import {createSelector} from "reselect";

const selectReply = state => state.reply;

export const selectReplyFormHidden = createSelector(
    [selectReply],
    reply => reply.hidden
)