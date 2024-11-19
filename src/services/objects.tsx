import axios from "axios";


async function getListOfObjetsFromAPI() {
    
    try {
      
      const response = await axios.get('https://api.restful-api.dev/objects');
      return response.data;

    } catch (error) {
    
      console.error(error);
      return [];
    }

  }

  export default getListOfObjetsFromAPI