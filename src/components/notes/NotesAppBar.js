import React from 'react'
import moment from 'moment';

export const NotesAppBar = ({ date }) => {
    return (
        <div className="notes__appbar">
            <span>{ moment(date).format('d MMMM YYYY') }</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
