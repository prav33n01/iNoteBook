import React, { createContext, useState } from "react";

const noteContext = createContext();



const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([])

   //   Get all Notez
   const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStroage.getItem('token')
      },

    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
    
  }
  //   Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStroage.getItem('token')
      },

      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    

  }

  // Delete a Note
  const deleteNote = async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStroage.getItem('token')
      },

    });
    const json = await response.json();
    

    const newNotes = notes.filter((note)=>{
      return note._id!==id
    })
    setNotes(newNotes)
    
  }

  // Edit a Note
  const editNote = async(id,title,description,tag)=> {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStroage.getItem('token')
      },

      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json()
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    // client side
    for(let index=0; index<newNotes.length ; index++){
      const element = newNotes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{ notes, addNote, getNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;
export { noteContext };