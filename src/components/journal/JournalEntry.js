import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { activeNote } from '../../action/notes'

export const JournalEntry = ({ notes }) => {
    const dispatch = useDispatch();
    const { body, date, id, title } = notes
    const noteDate = moment(date);
    const HandleShowNote = () =>{
        dispatch( 
            activeNote (id, {
                ...notes
            })
        )
    }
    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeInLeft animate__faster"
            onClick={ HandleShowNote }
        >
            {
                notes.url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url( ${notes.url} )`
                    }}
                ></div>
                
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>

        </div>
    )
}
