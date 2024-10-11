const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      infoCharacters: {},
      infoFilms: {},
      characters: [],
      films: [],
      favoriteCharacters: JSON.parse(localStorage.getItem("favoriteCharacters")) || [],
      notifications: JSON.parse(localStorage.getItem("notifications")) || [],
      viewedNotifications: 0,
      unviewedNotifications: 0,
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
                infoCharacters: data,
                characters: data.results,
              });
            } else {
              console.error("error en GET", data);
              setStore({
                infoCharacters: data,
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
      getFilms: (page = 1) => {
        fetch(`https://swapi.dev/api/films?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.results && Array.isArray(data.results)) {
              setStore({
                infoFilms: data,
                films: data.results,
              });
            } else {
              console.error("error en GET", data);
              setStore({
                infoFilms: data,
                films: [],
              });
            }
          })
          .catch((error) => {
            console.log(error);
            setStore({ films: [] });
          });
      },
      addFavoriteCharacter: (id) => {
        const store = getStore();
        const character = store.characters.find(
          (char) => char.url.split("/").filter(Boolean).pop() === String(id)
        );
      
        if (
          character &&
          !store.favoriteCharacters.some((fav) => fav.url === character.url)
        ) {
          const updatedFavorites = [...store.favoriteCharacters, character];
          setStore({ favoriteCharacters: updatedFavorites });
          localStorage.setItem("favoriteCharacters", JSON.stringify(updatedFavorites));
      
          // Agregar una nueva notificación sin eliminar las anteriores
          const newNotification = {
            id: Date.now(),
            message: `You have added ${character.name} to your favorite characters.`,
            imageUrl: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            isRead: false,
          };
      
          // Mantener las notificaciones anteriores y añadir la nueva
          const updatedNotifications = [...store.notifications, newNotification];
      
          setStore({
            notifications: updatedNotifications,
            unviewedNotifications: store.unviewedNotifications + 1,
          });
          localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
        }
      },
      removeFavoriteCharacter: (id) => {
        const store = getStore();
        const character = store.favoriteCharacters.find(
          (fav) => fav.url.split("/").filter(Boolean).pop() === String(id)
        );
      
        if (character) {
          const updatedFavorites = store.favoriteCharacters.filter((fav) => {
            const favId = fav.url.split("/").filter(Boolean).pop();
            return favId !== String(id);
          });
          setStore({ favoriteCharacters: updatedFavorites });
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      
          // Agregar una notificación para la eliminación del favorito
          const newNotification = {
            id: Date.now(),
            message: `You have removed ${character.name} from your favorite characters.`,
            imageUrl: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
            isRead: false,
            type: "remove", // Agregar un tipo para diferenciar la notificación
          };
      
          // Mantener las notificaciones anteriores y añadir la nueva
          const updatedNotifications = [...store.notifications, newNotification];
          setStore({
            notifications: updatedNotifications,
            unviewedNotifications: store.unviewedNotifications + 1,
          });
      
          // Almacenar las notificaciones en localStorage
          localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
        }
      },




      markNotificationsAsViewed: () => {
        const store = getStore();
        const updatedNotifications = store.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        }));

        // Reiniciar el contador de notificaciones no vistas a 0
        setStore({
          unviewedNotifications: 0,
        });
      },
    },
  };
};

export default getState;
