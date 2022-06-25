import {initializeApp} from 'firebase/app';

import {addDoc, collection, getFirestore} from 'firebase/firestore';


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

initializeApp(config);


export const firestore = getFirestore();

export const createReply = async(userId, userDisplayName, postId, replyContent, createdAt) =>{
    try{
        const docRef = await addDoc(collection(firestore, 'post', `${postId}`, 'reply'), {
            userId,
            userDisplayName,
            postId,
            replyContent,
            createdAt
        })
        return docRef.id
    }catch(error) {
        console.log('error creating reply', error.message)
    }
}