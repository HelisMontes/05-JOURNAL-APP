/**
 *  {
 *      note[],
 *      activate: null
 *      
 *      activate: {
 *          id:'ASDADQSADASDS8655DSAD65SA67D'
 *          title: 'Test'
 *          body: 'Test'
 *          urlImg: 'https://text.es'
 *          date: 121312312313
 *      }
 * 
 *  } 
 */

import { type } from "../types/types";

 const initialState = {
    notes: [],
    activate: null,
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.notesActive:
            return {
                ...state,
                activate: {
                    ...action.payload
                }
            }
        case type.notesLoad:
            return {
                ...state,
                notes: [...action.notas]
            }
        case type.notesUpdated:
            return{
                ...state,
                notes: state.notes.map( 
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }
        case type.notesDelete:
            return{
                ...state,
                activate: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            }
        case type.NotesLogoutCleaning:
            return{
                ...state,
                notes: [],
                activate: null
            }
        case type.notesAddNew:
            return{
                ...state,
                notes: [ action.payload, ...state.notes]
            }
        default:
            return state;
    }
}