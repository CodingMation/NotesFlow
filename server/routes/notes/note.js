const User = require('../../models/User')
const Note = require('../../models/Note')

const authenticate = require('../../CommonSnippet/Authenticate')

const mongoose = require('mongoose')    
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router()

// Create Note
// http://localhost:5000/api/notes/addnote
router.post('/addnote', authenticate, async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
      user: req.user._id
    });

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get All Notes for User
// http://localhost:5000/api/notes/getnote
router.get('/getnote', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update Note
// http://localhost:5000/api/notes/updatenote
router.put('/updatenote/:id', authenticate, async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });

    // Check user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete Note
// http://localhost:5000/api/notes/deletenote
router.delete('/deletenote/:id', authenticate, async (req, res) => {
    try {
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Invalid note ID format' });
      }

      const note = await Note.findById(req.params.id);      
      if (!note) {return res.status(404).json({ msg: 'Note not found' });}
  
      if (!note.user.equals(req.user._id)) {
        console.log('Ownership mismatch:', {
          noteUserId: note.user.toString(),
          authUserId: req.user._id.toString()
        });
        return res.status(403).json({ 
          msg: 'Unauthorized - You do not own this note',
          noteId: note._id,
          userId: req.user._id 
        });
      }
  
      // Perform deletion
      await Note.findByIdAndDelete(req.params.id);
      
      res.json({ 
        msg: 'Note successfully deleted',
        deletedNoteId: req.params.id
      });
  
    } catch (err) {
      console.error('Delete note error:', err);
      res.status(500).json({ 
        msg: 'Server error',
        error: err.message 
      });
    }
  });

module.exports = router