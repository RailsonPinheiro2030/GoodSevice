import axios from "axios";
import { faker } from "@faker-js/faker/locale/pt_BR";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
});


const fetchImage = (index) => {
  return `https://picsum.photos/id/${index}/300/200`;
};



const generateLocation = () =>{
  return faker.location.city()
} 


export const getItems = async () => {
  try {
    let response = await api.get("/api/service");
    const itemsWithImages = response.data.map((item, index) => {
      const stars = Math.floor(Math.random() * 6)
      const image = fetchImage(index);
      const location = generateLocation();
      return { ...item, image, stars, location};
    });
    return itemsWithImages;
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    throw error;
  }
};



export const getScheduledId = async (service_id) =>{
  let response = await api.get(`/api/schedule/filter?service_id=${service_id}`);
  return response.data
}

export const getSearchService = async (parameters) =>{
  let response =  await api.get(`/api/service/search?parameters=${parameters}`);
  return response.data
  
}

export const scheduleService = async (data)=>{
  let response = await api.post('/api/schedule/create', data);
  return response;
}