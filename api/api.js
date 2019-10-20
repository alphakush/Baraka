import axios from 'axios';

export default axios.create({
    baseURL: "https://8006543b.ngrok.io",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});