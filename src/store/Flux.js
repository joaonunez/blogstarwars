const getState = ({getActions, getStore, setStore}) =>{
    return{
        store:{
            info:{},
            characters:[]
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
            }
        },
    };
};

export default getState;