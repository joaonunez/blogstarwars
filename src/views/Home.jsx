import React from "react"
import { NavBar } from "../components/NavBar";
import { SectionCharacters } from "../components/SectionCharacters";
import { FilmSection } from "../components/FilmSection";

export function Home(){
    return(
        <>
            <NavBar/>
            <SectionCharacters/>
            <FilmSection/>
        </>
    );
}