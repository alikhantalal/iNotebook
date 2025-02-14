import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const [notes, setNotes] = useState([]);

    // Get notes from the server
    const getNotes = async (page = 1, limit = 5) => {
        const response = await fetch(`/api/notes/fetchallnotes?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
    
        const data = await response.json();
        if (response.ok) {
            setNotes(data.notes);
        } else {
            console.error("Error fetching notes:", data);
        }
    };
    
    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const newNote = await response.json();
            console.log("New Note Added:", newNote);
            setNotes([...notes, newNote]); // Append the new note to the state
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove the note from the state after successful deletion
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    // Edit a note
    const editNote = async (id, { title, description, tag }) => {
        if (!id) {
            console.error('Note ID is missing');
            return;
        }

        try {
            const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedNote = await response.json();

            // Update the note in the state
            setNotes(notes.map(note => note._id === id ? updatedNote : note));
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
