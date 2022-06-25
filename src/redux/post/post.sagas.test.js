import { takeLatest, put, call, select } from 'redux-saga/effects';

import PostActionTypes from "./post.types";

import {auth, firestore} from '../../firebase/firebase.utils'
import {collection, getDocs, query, where, orderBy, collectionGroup} from "firebase/firestore";

import {
    getLikeSnapshot,
    getRepliesSnapShot,
    fetchPostsAsync,
    fetchUserPostsAsync,
    fetchPostsStart,
    fetchUserPostsStart,
    submitPost,
    onSubmitPostStart, getUserData
}
    from './post.sagas'

jest.mock("firebase/firestore", () => {
    const original = jest.requireActual("firebase/firestore");
    return {
        ...original,
        collectionGroup: jest.fn(),
        collection: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
        getDocs: jest.fn(),
        orderBy: jest.fn()
    }
})

describe('on fetch post start', () => {
    it('should trigger FETCH_POSTS_START', () => {
        const generator = fetchPostsStart();
        expect(generator.next().value).toEqual(takeLatest(PostActionTypes.FETCH_POSTS_START, fetchPostsAsync)
        );
    });

    it('should trigger FETCH_USER_POSTS_START', () => {
        const generator = fetchUserPostsStart();
        expect(generator.next().value).toEqual(takeLatest(PostActionTypes.FETCH_USER_POSTS_START, fetchUserPostsAsync)
        );
    });
})

describe('on submit post start', () => {
    it('should trigger SUBMIT_POST_START', () => {
        const generator = onSubmitPostStart();
        expect(generator.next().value).toEqual(takeLatest(PostActionTypes.SUBMIT_POST_START, submitPost)
        );
    });
});

describe('get Likes',()=>{
    const generator = getLikeSnapshot();
    it('should trigger collectionGroup', () =>{
        collectionGroup.mockImplementation()
        generator.next();
        expect(collectionGroup).toHaveBeenCalled()
    })
})

describe('get replies',()=>{
    const generator = getRepliesSnapShot();
    it('should trigger collectionGroup', () =>{
        collectionGroup.mockImplementation()
        generator.next();
        expect(collectionGroup).toHaveBeenCalled()
    })
})

describe('fetch user posts async saga', () => {
    const generator = fetchUserPostsAsync();
    it('should select user data', () =>{
         expect(generator.next().value).toEqual(select(getUserData))
    })

    it('should call firestore collection', () => {
        collection.mockImplementation();
        generator.next();
        expect(collection).toHaveBeenCalled();
    });
/*
    it('should query firestore collection', () => {
        const postRef = {id:2}
        expect(generator.next().value).toEqual(query(postRef, where("userId", "==", userState.currentUser.userId),
            orderBy("createdAt", "desc")));
    });
    it('should query firestore collection', () => {
        getDocs.mockImplementation();
        generator.next();
        expect(getDocs).toHaveBeenCalled();
    });
*/





})