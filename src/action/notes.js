import Swal from 'sweetalert2'

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { type } from '../types/types'
export const startNewNotes = () => {
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

export const updateNote = ({id, title, body, url}) => { 
    return async( dispatch, getState ) => {
        try {
            const { uid } = getState().auth;
            const dataUpdate ={
                title,
                body,
                url,
                date: new Date().getTime(),
            }
            dataUpdate.url ?? delete dataUpdate.url
            await db.doc(`${ uid }/journal/notes/${id}`).update(dataUpdate)    
            dispatch( refreshNote(id, dataUpdate ) )
            dispatch( activeNote( id, dataUpdate ) );
            Swal.fire('Note updated', title, 'success')
        } catch (error) {
            Swal.fire('Error', error, 'error')
        }
    }
}

export const refreshNote = (id, note ) => ({
    type: type.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
  return async ( dispatch, getState ) => {
    const { activate:noteActive } = getState().notes
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });
    const urlApi = await fileUpload( file )
    noteActive.url = urlApi
    dispatch( updateNote ( noteActive ))
    Swal.close();
  }
}