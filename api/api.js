import axios from 'axios';

export default axios.create({
    baseURL: "http://19b1d4a5.ngrok.io/api/v1",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});
