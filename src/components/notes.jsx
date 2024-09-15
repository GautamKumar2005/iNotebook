import React, { useContext, useEffect, useState } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../contextapi/noteContext";
import "./noteitem.css";

const Notes = () => {
  const [note, setNote] = useState({ Title: "", Description: "", Tag: "" });
  const context = useContext(noteContext);
  const { Notes, addNote, getNote, editNote } = context;

  useEffect(() => {
    getNote(); // Fetch all notes on component mount
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    if (note._id) {
      await editNote(note._id, note.Title, note.Description, note.Tag); // Update note
    } else {
      await addNote(note.Title, note.Description, note.Tag); // Add new note
    }

    var myModalEl = document.getElementById('exampleModal');
    var modal = window.bootstrap.Modal.getInstance(myModalEl);
    modal.hide(); // Hide the modal after submission
    setNote({ Title: "", Description: "", Tag: "" }); // Reset form fields
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // Update form state
  };

  const updatenote = (currentNote) => {
    setNote({
      _id: currentNote._id, // Include note ID for editing
      Title: currentNote.Title,
      Description: currentNote.Description,
      Tag: currentNote.Tag,
    });

    // Trigger the modal using Bootstrap JS
    var myModal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
    myModal.show();
  };

  return (
    <>
      {/* Modal for adding/editing notes */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {note._id ? "Edit Note" : "Add Note"}
              </h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Title"
                    name="Title"
                    value={note.Title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Description"
                    name="Description"
                    value={note.Description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Tag"
                    name="Tag"
                    value={note.Tag}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                  {note._id ? "Update Note" : "Add Note"}
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Display all notes */}
      <div className="py-4 px-6">
        <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
        <div className="note flex flex-wrap gap-4">
          {Notes.length===0 && "No note is found"}
          {Notes.map((note) => (
            <div key={note._id} className="bg-white shadow-md rounded-lg p-4 w-64">
              <Noteitem note={note} updatenote={updatenote} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
