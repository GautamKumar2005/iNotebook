import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [Notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjZkYzRkZDBlMDBkZWVkYTMwOGNhYTgyIn0sImlhdCI6MTcyNjMzNzk0MH0.SzNwzldklTzuZwLZMLOGL_NirITJkskyFu-guLhFXbA",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (Title, Description, Tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjZkYzRkZDBlMDBkZWVkYTMwOGNhYTgyIn0sImlhdCI6MTcyNjMzNzk0MH0.SzNwzldklTzuZwLZMLOGL_NirITJkskyFu-guLhFXbA",
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });
    const note = await response.json();
    setNotes(Notes.concat(note)); // Add new note to state
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjZkYzRkZDBlMDBkZWVkYTMwOGNhYTgyIn0sImlhdCI6MTcyNjMzNzk0MH0.SzNwzldklTzuZwLZMLOGL_NirITJkskyFu-guLhFXbA",
      },
    });
    const newNotes = Notes.filter((note) => note._id !== id);
    setNotes(newNotes); // Update state after deletion
  };

  // Edit a note
  const editNote = async (id, Title, Description, Tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // Use PUT for update operations
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoiNjZkYzRkZDBlMDBkZWVkYTMwOGNhYTgyIn0sImlhdCI6MTcyNjMzNzk0MH0.SzNwzldklTzuZwLZMLOGL_NirITJkskyFu-guLhFXbA",
      },
      body: JSON.stringify({ Title, Description, Tag }),
    });

    const updatedNotes = Notes.map((note) =>
      note._id === id ? { ...note, Title, Description, Tag } : note
    );
    setNotes(updatedNotes); // Update state after editing
  };

  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, getNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
