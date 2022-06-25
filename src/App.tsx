import React, {useEffect} from 'react';
import {Switch, Route, Redirect } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import './App.css';

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import UserDashboard from "./pages/user-dashboard/user-dashboard.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import {checkUserSession } from "./redux/user/user.actions";
import Header from "./components/header/header.component";
import NewPost from "./pages/new-post/new-post.component";
import UserPosts from "./pages/user-post/user-post.component";
import AllPosts from "./pages/all-posts/all-posts.component";
import {Timestamp} from "firebase/firestore";


export type post = {
    createdAt: Timestamp
    likes:[like
    ],
    postContent: string,
    postTitle: string,
    postId:string,
    replies:[reply
    ],
    userDisplayName:string,
    userId:string
}

export type reply = {
    createdAt: Timestamp,
    replyContent: string,
    replyId: string,
    userDisplayName: string,
    userId: string
}


export type like ={
    likeId:string,
    userId:string
}

export type currentUser = {
    createdAt:Timestamp,
    displayName:string,
    email:string,
    userId:string
};

export type isFetching = boolean;

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();


  useEffect(() =>{
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <div>
      <Header/>
      <Switch>
      <Route exact path='/'
      render={() =>
          currentUser ?
              (<Redirect to='/dashboard'/>) :
              (<SignInAndSignUpPage/>)
      }
      />
      <Route exact path='/dashboard'
             render={() =>
             currentUser ? (<UserDashboard/>):
                 (<Redirect to='/' />)
             }/>
      <Route exact path='/create-post' component={NewPost} />
      <Route exact path='/user-posts' component={UserPosts} />
      <Route exact path='/all-posts' component={AllPosts} />
      </Switch>
    </div>
  );
}

export default App;
