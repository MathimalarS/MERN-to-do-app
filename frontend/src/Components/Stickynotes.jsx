import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../assets/css/Stickynotes.css';

const StickyWall = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', color: '', image: '', voice: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes');
        setNotes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setNotes([]);
      }
    };
    fetchNotes();
  }, []);

  // Create a new note
  const handleAddNote = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes');
      setNotes([...notes, response.data]);
      setNewNote({ title: '', color: '', image: '', voice: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Update an existing note
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      await axios.put(`/api/notes/${id}`, updatedNote);
      setNotes(notes.map(note => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="stickywall-container">
      <Sidebar />
      <div className="sticky-notes">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className={`note ${note.color}`}>
              <textarea
                value={note.title}
                onChange={(e) => handleUpdateNote(note._id, { ...note, title: e.target.value })}
              />
              {note.image && <img src={note.image} alt="Note" />}
              {note.voice && (
                <audio controls>
                  <source src={note.voice} type="audio/mpeg" />
                </audio>
              )}
              <div className="note-options">
                <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                <label>
                  Color:
                  <input
                    type="color"
                    value={note.color}
                    onChange={(e) => handleUpdateNote(note._id, { ...note, color: e.target.value })}
                  />
                </label>
                <label>
                  Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleUpdateNote(note._id, { ...note, image: URL.createObjectURL(e.target.files[0]) })
                    }
                  />
                </label>
                <label>
                  Voice:
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      handleUpdateNote(note._id, { ...note, voice: URL.createObjectURL(e.target.files[0]) })
                    }
                  />
                </label>
              </div>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}

        {/* Plus button to add a new note */}
        {isEditing ? (
          <div className="note empty">
            <textarea
              placeholder="Enter note"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <div className="note-options">
              <label>
                Color:
                <input
                  type="color"
                  value={newNote.color}
                  onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
                />
              </label>
              <label>
                Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewNote({ ...newNote, image: URL.createObjectURL(e.target.files[0]) })
                  }
                />
              </label>
              <label>
                Voice:
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    setNewNote({ ...newNote, voice: URL.createObjectURL(e.target.files[0]) })
                  }
                />
              </label>
              <button onClick={handleAddNote}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="note empty plus" onClick={() => setIsEditing(true)}>+</div>
        )}
      </div>
    </div>
  );
};

export default StickyWall;
