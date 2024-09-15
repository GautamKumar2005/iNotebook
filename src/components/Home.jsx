import React, { useContext, useState } from "react";
import Note from "./notes";
import noteContext from "../contextapi/noteContext";

const Home = () => {
  const [note, setNote] = useState({ Title: "", Description: "",Tag:""}); 
  const context = useContext(noteContext);
  const { addNote } = context;

  const handleClick =async (e) => {
    e.preventDefault(); 
    await addNote(note.Title, note.Description, note.Tag); // Call addNote function
    setNote({ Title: "", Description: "", Tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); 
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="addnote">Add note</h1>
        <form className="form" > 
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Title"
              name="Title" 
              aria-describedby="emailHelp"
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
              name="Description" // Add name attribute
              onChange={onChange} // Fix the onChange function name
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
              name="Tag" // Add name attribute
              onChange={onChange} // Fix the onChange function name
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
        <Note />
      </div>
    </>
  );
};

export default Home;
