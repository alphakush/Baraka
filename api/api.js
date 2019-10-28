import axios from 'axios';

export default axios.create({
    baseURL: "https://barakaapi.azurewebsites.net/api/v1",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});
