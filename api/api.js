import axios from 'axios';

export default axios.create({
    baseURL: "http://7ae24380.ngrok.io",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});