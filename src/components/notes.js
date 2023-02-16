import React, { useContext, useState } from "react";
import { noteContext } from "../context/notes/NoteState";

function Notes() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    const handleClick = (e)=>{
        // e.preventDefault();
        addNote(note.title, note.description, note.tag);
        // setNote({title:"", description:"", tag:""})
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    return (
        <>
        <div className="my-3">
            <h2>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
           
        </div>
        </>
    )
}

export default Notes;