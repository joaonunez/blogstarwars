import React from "react"
import { NavBar } from "../components/NavBar";
import { SectionCharacters } from "../components/character/SectionCharacters";
import { FilmSection } from "../components/film/FilmSection";

export function Home(){
    return(
        <>
            <NavBar/>
            <SectionCharacters/>
            <FilmSection/>
        </>
    );
}