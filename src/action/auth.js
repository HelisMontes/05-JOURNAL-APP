import { type } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config'

export const startLoginEmailPassword = ( email, password ) =>{
    
    /**
     * @param  ( dispatch ) es enviado mediante el applyMiddleware( thunk )
     * tambien se pude hacer cualquier petición asíncrona ya sea un fetch(), 
     * subir archivo o incluso otro dispatch
     */
    return ( dispatch ) => {
        setTimeout(() => {
            dispatch( login ( 1223, 'Pedro' ) )
        }, 3500);
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
export const login = (uid, displayName) => ({
    type: type.login,
    payload: {
        uid,
        displayName 
    }
});