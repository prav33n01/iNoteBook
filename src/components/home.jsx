import React, { useContext, useEffect, useState, useRef } from "react";
import Notes from "./notes";
import { noteContext } from "../context/notes/NoteState";
import NoteItem from "./noteItem";
import { useNavigate } from "react-router-dom";

function Home() {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    let navigate = useNavigate();

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        if(localStorage.getItem('token')){

            getNote();
        }
        else{
            navigate("/login")
        }
    }, []);    // eslint-disable-line react-hooks/exhaustive-deps

    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription)
        refClose.current.click();
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    

    
    return (
        <>
            <div>
                <Notes />

                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <h2>Your Notes</h2>
                    <div className="container mx-2">
                        {notes.length===0 && 'No Notes to display.'}
                    </div>
                    {notes.map((note) => {
                        return (
                            <NoteItem key={note._id} updateNote={updateNote} note={note} />
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Home;
