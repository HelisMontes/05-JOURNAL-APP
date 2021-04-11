import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { startUploading, updateNote } from '../../action/notes';

export const NotesAppBar = ({ date, note }) => {
    const dispatch = useDispatch();
    const handleSave = () => {
      dispatch( updateNote ( note ) ) 
    }
    const handleUploadPicture = () =>{
      document.querySelector('#fileSelector').click()
    }
    const handleFileChance = (e) => {
      const file = e.target.files[0];
      file && dispatch( startUploading( file ));
    }
    return (
      <div className="notes__appbar">
          <span>{ moment(date).format('d MMMM YYYY') }</span>
          <input
            id="fileSelector"
            name="file"
            type="file"
            style={ { display: 'none' } }
            onChange={ handleFileChance }
          />
          <div>
              <button 
                className="btn"
                onClick={ handleUploadPicture }
              >
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
