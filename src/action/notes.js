import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { type } from '../types/types'
export const startnEWNotes = () => {
    return async ( dispatch, getState ) =>{
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const docRef = await db.collection(`${ uid }/journal/notes`).add( newNote );
        dispatch( activeNote( docRef.id, newNote ) );
    }
}   

export const activeNote = ( id, note ) => ({
    type: type.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch )=>{
        const notes = await loadNotes( uid )
        dispatch( setNotes ( notes ) );
    }
}

export const setNotes = ( notes ) =>({
    type: type.notesLoad,
    notas: notes
})