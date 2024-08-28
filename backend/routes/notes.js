const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes for the authenticated user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new note
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title'),
    body('description', 'Description must be at least 5 characters long'),
], async (req, res) => {
    // Get validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    try {
        const note = new Notes({ 
            title, 
            description, 
            tag, 
            user: req.user.id 
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update a note using PUT "api/notes/updatenotes/:id". Login required
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        // Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Not found");

        // Check if the note belongs to the user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete a note using DELETE "api/notes/deletenotes/:id". Login required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send("Not found");

        // Check if the note belongs to the user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // Delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
