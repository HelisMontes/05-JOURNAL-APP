import { type } from "../types/types";

export const login = (uid, displayName) => ({
    type: type.login,
    payload: {
        uid,
        displayName 
    }
});