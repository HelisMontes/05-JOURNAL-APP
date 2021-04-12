import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startDeleting } from '../../action/notes';
import { useForm } from '../../hook/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();
    const { activate:note } = useSelector( state => state.notes );
    const [ values, handleInputChange, reset ] = useForm( note )
        
    const activeId = useRef( note.id );

    useEffect(() => {
        if( note.id !== activeId.current ){
            reset( note )
            activeId.current = note.id
        }    
    }, [reset, note])
    
    const { body, title } = values

    const handleDelete =() => {
        dispatch( startDeleting ( note.id ))
    }
    return (
        <div className="notes__main-content">
            
            <NotesAppBar 
                date = { note.date }
                note = { values }
            />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                {
                    note.url && 
                    (
                        <div className="notes__image">
                            <img 
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )

                }


            </div>
            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Danger
            </button>
        </div>
    )
}
