import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Favorites } from "./views/Favorites";
import { Character } from "./views/Character";
import injectContext from "./store/Context";
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/character/:id" element={<Character/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default injectContext(App);

