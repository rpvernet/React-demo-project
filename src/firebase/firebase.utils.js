import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {addDoc, collection, doc, getDoc, getFirestore, setDoc, Timestamp} from 'firebase/firestore';



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

export const auth = getAuth();
export const firestore = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = doc(firestore,`users/${userAuth.uid}`);

    const userSnapShot = await getDoc(userRef);

    if(!userSnapShot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userRef,{
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message)
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
};

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ param: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth,googleProvider);


export const createPost = async (userId, postTitle, postContent, userDisplayName) =>{
    try{
    await addDoc(collection(firestore,'post'),{
        postTitle,
        userId,
        postContent,
        userDisplayName,
        createdAt:Timestamp.now()
    });
    }catch (error){
        console.log('error creating post', error.message);
    }
};

const getLikes = (originalPostId, likeSnapSnot) =>{
    const likes=[]
    likeSnapSnot.docs.forEach((doc) =>{
            const {userId, postId} = doc.data();

            if(originalPostId === postId){
                likes.push({userId,likeId:doc.id})
            }
        });
    return likes
};


const getReplies = (originalPostId, postReplies) => {
    const replies = []
    postReplies.docs.forEach((doc) => {
        const {userId, userDisplayName, createdAt, postId, replyContent} = doc.data();
        if (postId === originalPostId) {
            replies.push({userId, userDisplayName, createdAt, replyContent, replyId: doc.id})
        }

    });
    return replies.sort(function(a,b){
        return a.createdAt.seconds - b.createdAt.seconds
    })
};


export const convertPostSnapShotToMap = (posts, postLikes, postReplies) => {
    return posts.docs.map(doc => {
        const {postTitle, postContent, userId, createdAt, userDisplayName} = doc.data();
        const postId = doc.id
        const likes = getLikes(postId, postLikes)
        const replies = getReplies(postId, postReplies)

        return {
            postId: doc.id,
            postTitle,
            postContent,
            userId,
            createdAt,
            userDisplayName,
            likes,
            replies
        };
    });
};
