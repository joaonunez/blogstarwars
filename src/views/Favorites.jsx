import React from "react"
import { NavBar } from "../components/NavBar";
import { SectionFavorites } from "../components/favorite/SectionFavorites"; 

export function Favorites(){
    return(
        <>
            <NavBar/>
            <SectionFavorites/>
        </>
    );
}