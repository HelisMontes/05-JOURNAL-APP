import { type } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = ( email, password ) =>{
    
    /**
     * @param  ( dispatch ) es enviado mediante el applyMiddleware( thunk )
     * tambien se pude hacer cualquier petición asíncrona ya sea un fetch(), 
     * subir archivo o incluso otro dispatch
     */
    return async ( dispatch ) => {
        dispatch( startLoading() )
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword( email, password );
            dispatch( login ( user.uid, user.displayName ) );
            dispatch ( finishLoading() )
        } catch (error) {
            console.log(error);
            dispatch ( finishLoading() )
        }
    }
}
export const startGoogleLogin = () => {
    return( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ( { user } ) => {
                dispatch( login( user.uid, user.displayName) )
            });
    }
}
export const startRegisterForEmail = (email, password, name ) => {
    return( dispatch ) =>{
        firebase.auth().createUserWithEmailAndPassword (email, password)
            .then ( async ({ user }) =>{
                await user.updateProfile({ displayName:name })
                dispatch( login (user.uid, user.displayName ) );
            })
            .catch ( error =>{
                console.log(error)
            })
    }
}

export const login = (uid, displayName) => ({
    type: type.login,
    payload: {
        uid,
        displayName 
    }
});