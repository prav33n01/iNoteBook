import React from "react";
import Nav from "./components/Navbar"
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import Signup from "./components/signup";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
   <>
   <NoteState>
   <Router>
    <Nav />

    <div className="container my-3">
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route exact path="/about"  element={<About />} />
          <Route exact path="/login"  element={<Login />} />
          <Route exact path="/signup"  element={<Signup />} />
        </Routes>
      </div>
   </Router>
   </NoteState>
   </>
  )
}

export default App;
