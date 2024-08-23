import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = ({ note }) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="fa fa-trash mx-2" aria-hidden="true" onClick={() => deleteNote(note._id)}></i>
                            <i className="fa-regular fa-pen-to-square mx-2"></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
