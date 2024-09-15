import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Nav from "./components/Nav";
import NoteState from "./contextapi/noteState";
import Alert from "./components/alert";

export default function App() {
  return (
    <NoteState>
      <Router>
        <main>
        <div className="conatiner">
            <Nav />
            <Alert/>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
          </div>
        </main>
      </Router>
    </NoteState>
  );
}
