import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "66c423cf4caf198b16e4e8e4",
            "user": "66c3278f3037b0577bbb8ce9",
            "title": "my title",
            "description": "wake up early",
            "date": "2024-08-20T05:04:15.782Z",
            "__v": 0
        },
        // Add more initial notes if needed
    ];
    
    const [notes, setNotes] = useState(notesInitial);

    // Add a note
    const addNote = (title, description, tag) => {
        console.log("adding a new note");
        const note = {
            "_id": new Date().toISOString(), // Use a unique ID
            "user": "66c3278f3037b0577bbb8ce9",
            "title": title,
            "description": description,
            "date": new Date().toISOString(),
            "__v": 0
        };
        setNotes([...notes, note]); // Create a new array with the new note
    };

    // Delete a note
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note._id !== id));
    };

    // Edit a note
    const editNote = (id, updatedNote) => {
        setNotes(notes.map(note => note._id === id ? { ...note, ...updatedNote } : note));
    };

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
