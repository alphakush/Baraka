import axios from 'axios';

export default axios.create({
    baseURL: "https://baraka-api.herokuapp.com/api/v1",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});
