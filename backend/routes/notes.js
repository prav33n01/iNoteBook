const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");



// ROUTE 1: Get all the notes using. GET:"/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal server error!")
    }
});

// ROUTE 2: Add a new note using. POST:"/api/notes/addnote". Login required
router.post("/addnote", fetchuser, [
    body('title', 'Title can not be empty').isLength({ min: 3 }),
    body('description', 'Description is too short').isLength({ min: 5 })
], async (req, res) => {

    // If there are errors return Bad requests and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const savedNote = note.save();

    res.json(savedNote);

});


// ROUTE 3: Update a  note using. PUT:"/api/notes/updatenote/:id". Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {

    // If there are errors return Bad requests and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;

    const newNote = {}

    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json(note);
});


// ROUTE 4; Delete a note using. DELETE:"/api/notes/delete/:id". Login Required.

router.delete("/deletenote/:id", fetchuser, async (req,res)=>{

    try{
        // Find the note to delete and delete it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send('Not Found')};

        //  Allow deletion only if user own this note
        if(note.user.toString() != req.user.id){
            return res.status(401).send('Not Allowed!')
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success" : "Note has been deleted", note: note});
    } catch(error){
        res.status(500).send("Internal server error!");
    }
})

module.exports = router;