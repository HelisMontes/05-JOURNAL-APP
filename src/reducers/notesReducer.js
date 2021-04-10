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

export const notesReducer = (state = initialState, action ) => {
    switch (action.type) {
        case type.notesActive:
            return {
                ...state,
                activate: {
                    ...action.payload
                }
            }
        case type.notesLoad:
            return{
                ... state,
                notes: [...action.notas]
            }
        default:
            return state;
    }
}