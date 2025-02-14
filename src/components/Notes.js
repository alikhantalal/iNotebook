import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';

const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote, deleteNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/");
        }
    }, [getNotes, navigate]);

    const [currentNote, setCurrentNote] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 4; // Adjust this value as needed

    // Calculate the indices for the current page
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

    const handleShow = (note) => {
        setCurrentNote(note);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        setCurrentNote(prevNote => ({
            ...prevNote,
            [e.target.name]: e.target.value
        }));
    };

    const handleSaveChanges = async () => {
        if (currentNote) {
            try {
                const { _id, title, description, tag } = currentNote;
                await editNote(_id, { title, description, tag });
                handleClose();
                props.showAlert("Updated successfully", "success");
            } catch (error) {
                props.showAlert("Failed to update note", "danger");
            }
        }
    };

    // Pagination logic
    const handleNextPage = () => {
        if (currentPage < Math.ceil(notes.length / notesPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            {/* Modal for editing note */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {currentNote && (
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={currentNote.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={currentNote.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tag"
                                            name="tag"
                                            value={currentNote.tag}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                {currentNotes.length === 0 && 'No notes to display'}
                {currentNotes.map((note) => (
                    <Noteitem key={note._id} note={note} updateNote={handleShow} deleteNote={deleteNote} showAlert={props.showAlert} />
                ))}
            </div>

            {/* Pagination controls */}
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage >= Math.ceil(notes.length / notesPerPage)}>Next</button>
            </div>
        </>
    );
};

export default Notes;
