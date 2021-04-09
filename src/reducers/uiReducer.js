import { type } from '../types/types';

const init = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = init , action ) => {
    switch (action.type) {
        case type.msgSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case type.msgRemoveError:
            return {
                ...state,
                msgError: null
            }
    
        default:
            return state;
    }
}
