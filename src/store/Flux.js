const getState = ({getActions, getStore, setStore}) =>{
    return{
        store:{
            info:{},
            characters:[],
            favorites: JSON.parse(localStorage.getItem("favorites")) || [], //con esto cargamos favoritos desde localstorage
        },
        actions:{
            getCharacter:() =>{
                fetch("https://rickandmortyapi.com/api/character",{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    },
                })
                .then((response)=>response.json())
                .then((data) => {
                    if(data.results && Array.isArray(data.results)){
                        setStore({
                            info: data,
                            characters: data.results
                        });
                    }
                    else{
                        console.error("error en GET", data)
                        setStore({
                            info: data,
                            characters: []
                        });
                    }
                })
                .catch((error) =>{
                    console.log(error);
                    setStore({characters: []});
                });
            },
            addFavorite: (id) => {
                const store = getStore();
                const character = store.characters.find((char) => char.id === id);
        
                if (character) {
                  const updatedFavorites = [...store.favorites, character];
                  setStore({ favorites: updatedFavorites });
                  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                }
            },
            removeFavorite: (id) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter((fav) => fav.id !== id);
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },
        },
    };
};

export default getState;