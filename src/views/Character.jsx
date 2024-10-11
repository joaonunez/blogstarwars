import React from "react";
import { NavBar } from "../components/NavBar";
import { CharacterProfile } from "../components/character/CharacterProfile";

export function Character() {
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <CharacterProfile />
      </div>
    </>
  );
}
