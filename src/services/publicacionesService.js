import apiClient from "./api"

export const obtenerPublicaciones = async () =>{
    try{
        const response =await apiClient.get('/publicaciones');
        return response.data
    }catch(error){
        console.error("Error al obtener las publicaciones", error.response?.data || error.message);
        throw error;
    }
};

