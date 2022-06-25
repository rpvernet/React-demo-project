import { combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import userReducer from "./user/user.reducer";
import postReducer from "./post/post.reducer";
import replyReducer from "./reply/reply.reducer"


const persistConfig = {
    key:'root',
    storage

}

const rootReducer = combineReducers({
    user:userReducer,
    posts:postReducer,
    reply:replyReducer
});

export default persistReducer(persistConfig, rootReducer);