import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateNote } from '../../action/notes';

export const NotesAppBar = ({ date, note }) => {
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch( updateNote ( note ) ) 
    }
    return (
        <div className="notes__appbar">
            <span>{ moment(date).format('d MMMM YYYY') }</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
