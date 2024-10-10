const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      info: {},
      characters: [],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [], //con esto cargamos favoritos desde localstorage
      selectedCharacter: null,
    },
    actions: {
      getCharacters: (page = 1) => {
        fetch(`https://swapi.dev/api/people?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.results && Array.isArray(data.results)) {
              setStore({
                info: data,
                characters: data.results,
              });
            } else {
              console.error("error en GET", data);
              setStore({
                info: data,
                characters: [],
              });
            }
          })
          .catch((error) => {
            console.log(error);
            setStore({ characters: [] });
          });
      },
      getCharacterById: (id) => {
        fetch(`https://swapi.dev/api/people/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setStore({ selectedCharacter: data });
          })
          .catch((error) => console.error(error));
      },
      addFavorite: (id) => {
        const store = getStore();
        const character = store.characters.find(
          (char) => char.url.split("/").filter(Boolean).pop() === String(id)
        );

        if (
          character &&
          !store.favorites.some((fav) => fav.url === character.url)
        ) {
          const updatedFavorites = [...store.favorites, character];
          setStore({ favorites: updatedFavorites });
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
      },
      removeFavorite: (id) => {
        const store = getStore();
        const updatedFavorites = store.favorites.filter((fav) => {
          const favId = fav.url.split("/").filter(Boolean).pop();
          return favId !== String(id);
        });
        setStore({ favorites: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      },
    },
  };
};

export default getState;
