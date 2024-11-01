import React, { useState, useEffect, useRef } from "react";
import deleteIcon from "../assets/img/delete.svg";
import '../assets/css/Stickynotes.css';
import axios from "axios";
import Colour from './Colour'; // Assuming Colour component is properly defined

function Stickynotes() {
  const [notes, setNotes] = useState([]); // State to manage all notes
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("blueviolet");
  const timer = 500;
  const timeoutRef = useRef();

  useEffect(() => {
    // Fetch existing notes from the server when the component mounts
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };

    fetchNotes();
  }, []);

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const monthNames = [
      "Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];
    let hrs = date.getHours();
    const amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12 || 12;
    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(func, timer);
  };

  const saveNote = async (noteData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', noteData);
      console.log("Note saved:", response.data);
      setNotes(prevNotes => [...prevNotes, response.data]); // Update the notes state
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/${updatedNote.id}`, updatedNote);
      console.log("Note updated:", response.data);
      setNotes(prevNotes => prevNotes.map(note => note.id === updatedNote.id ? response.data : note));
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const handleTextChange = (event) => {
    setNewNoteText(event.target.value);
  };

  const handleColorChange = (newColor) => {
    setNewNoteColor(newColor);
  };

  const handleAddNote = () => {
    const newNote = { text: newNoteText, color: newNoteColor };
    saveNote(newNote);
    setNewNoteText(""); // Clear the text area after adding
    setNewNoteColor("blueviolet"); // Reset to default color
  };

  return (
    <div>
      <h1>Sticky Notes</h1>
      <div className="new-note">
        <Colour setColor={handleColorChange} />
        <textarea
          className="note_text"
          value={newNoteText}
          onChange={handleTextChange}
          placeholder="Type your note here"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-container">
        {notes.map(note => (
          <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
            <Colour setColor={(color) => handleColorChange(color)} />
            <textarea
              className="note_text"
              value={note.text}
              onChange={(e) => {
                const updatedText = e.target.value;
                debounce(() => updateNote({ ...note, text: updatedText }));
              }}
              placeholder="Type your note here"
            />
            <div className="note_footer">
              <p>{formatDate(note.time)}</p>
              <img
                src={deleteIcon}
                alt="DELETE"
                onClick={() => deleteNote(note.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stickynotes;
