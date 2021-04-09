import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator'

import { useForm } from '../../hook/useForm';

export const RegisterScreen = () => {
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
            console.log('Name is required');
            return false;
        }else if( !validator.isEmail( email ) ){
            console.log('Email is noy validate')
            return false;
        } else if( password !== password2 || password.trim().length <5 ){
            console.log('Passwaord shouldbe at least 6 characters and match each other');
            return false;
        }
        return true
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit= { handleRegister }>

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
