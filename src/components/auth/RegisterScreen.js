import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'

import { useForm } from '../../hook/useForm';
import { setError, removeError } from '../../action/ui';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const state = useSelector( state => state.UI );
    const { msgError } = state    
    const [formValues, handleImputchange ] = useForm({
        name: 'Jose',
        email: 'jose@gmail.com',
        password: '123456',
        password2: '123456',
    });
    
    const { name, email, password, password2 } = formValues
    
    const handleRegister = (e) => {
        e.preventDefault()

        if ( isValidate() ) return console.log('Form correcto')
    }

    const isValidate = () => {
        if( name.trim().length === 0 ){
            dispatch( setError ('Name is required') ); 
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch( setError ('Email is noy validate') )
            return false;
        } else if( password !== password2 || password.trim().length <5 ){
            dispatch( setError ('Passwaord shouldbe at least 6 characters and match each other') );
            return false;
        }
        dispatch( removeError () );
        return true
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit= { handleRegister }>
                {
                    msgError && (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleImputchange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleImputchange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleImputchange}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleImputchange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
