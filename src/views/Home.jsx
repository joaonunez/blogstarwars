import React from "react"
import { NavBar } from "../components/NavBar";
import { SectionCharacters } from "../components/SectionCharacters";

export function Home(){
    return(
        <>
            <NavBar/>
            <SectionCharacters/>
        </>
    );
}