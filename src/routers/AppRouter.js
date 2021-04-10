import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../action/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    /** 
     * Mientras checking este en true no se va a mostrar nada de la aplicación
     * hasta validar que este autenticado.
    */
    const [checking, setChecking] = useState(true);
    /**
     * Si isLoggedIn es true esta logueado de forma correcta
     */
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged (( user ) => { 
            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
            // Cambiamos el estado a false una vez confirmamos que esta logueado
            setChecking(false) 
        });
    }, [dispatch, setChecking, setIsLoggedIn]);
    if ( checking ) return <h1>wait...</h1>
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        isLoggedIn = { isLoggedIn }
                        component={ AuthRouter }
                    />
                    <PrivateRoute 
                        exact
                        path="/"
                        isLoggedIn = { isLoggedIn }
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
