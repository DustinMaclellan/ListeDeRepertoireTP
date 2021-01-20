import {createContext, useContext} from 'react';

export const ContexteAuth = createContext();

export function UtiliserAuth() {
    return useContext(ContexteAuth);
}