import React, {useContext} from "react";
import { noteContext } from "../context/notes/NoteState";

function About() {
    const a = useContext(noteContext)
    return (
        <div>
            <h3>This is about {a.name} and he is in {a.class}</h3>
        </div>
    )
}

export default About;