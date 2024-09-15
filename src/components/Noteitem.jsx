import React, { useContext } from "react";
import "./noteitem.css"
import noteContext from "../contextapi/noteContext";
const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const { note,updatenote } = props;

  return (
    <div className="theta bg-red shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out">
      <div className="p-4">
        <h5 className="text-xl font-semibold mb-2 text-gray-800">{note.Title}</h5>
        <p className="text-gray-600 text-sm">{note.Description}</p>
        <div className="icon">
            <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}/>
            <i className="fa-solid fa-pen-to-square" onClick={()=>{updatenote(note)}} />
        </div>
       
      </div>
    </div>
  );
};

export default Noteitem;


