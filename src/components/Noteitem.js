import React from 'react';

const Noteitem = ({ note, deleteNote, updateNote, showAlert }) => {
    return (
        <div className="col-md-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i
                                className="fa fa-trash mx-2"
                                aria-hidden="true"
                                onClick={() => {
                                    deleteNote(note._id);
                                    showAlert("Deleted successfully", "success");
                                }}
                                style={{ cursor: 'pointer' }}
                            ></i>
                            <i
                                className="fa-regular fa-pen-to-square mx-2"
                                onClick={() => updateNote(note)}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
