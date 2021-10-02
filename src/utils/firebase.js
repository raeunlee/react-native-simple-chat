import firebase from 'firebase/app';
import config from '../../firebase.json';
import "firebase/auth";


const app = firebase.initializeApp(config);

const Auth = app.auth();


export const login = async ({ email, password }) => {
    const {user} = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

export const signup = async ({ email, password }) => {
    const {user} = await Auth.createUserWithEmailAndPassword(email, password);
    return user;
};