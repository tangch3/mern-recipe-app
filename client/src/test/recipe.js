import axios from "axios";

async function recipes() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/recipes')
    return response.data[0].name
}

export default recipes