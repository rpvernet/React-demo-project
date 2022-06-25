import {initializeApp} from 'firebase/app';

import {addDoc, collection, deleteDoc, doc} from 'firebase/firestore';
import {firestore} from "./firebase.utils";


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

export const likeSubmit = async (userId, postId) =>{
    try{
        const docRef = await addDoc(collection(firestore,'post', `${postId}`, `like`), {
            userId,
            postId
        });
        return docRef.id


    }catch(error){
        console.log('error liking post', error.message)
    }

};

export const unlikeSubmit = async (likeId, postId) => {
    try{
        await deleteDoc(doc(firestore, "post", `${postId}`, "like", `${likeId}`))
    }catch(error){
        console.log('error unliking post', error.message)
    }

}