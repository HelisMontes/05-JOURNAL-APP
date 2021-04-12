import Swal from 'sweetalert2'

import { type } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "./ui";
import { cleanNotesAndLogout } from './notes';

export const startLoginEmailPassword = ( email, password ) =>{
    
    /**
     * @docs ( dispatch ) es enviado mediante el applyMiddleware( thunk )
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
            Swal.fire('Error', error.message, 'error')
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
                Swal.fire('Error', error.message, 'error')
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
export const startLogout = () =>{
    return async (dispatch) =>{
        await firebase.auth().signOut()
        dispatch( logout() )
        dispatch ( cleanNotesAndLogout() );
    }
}
export const logout = () => ({
    type: type.logout
})