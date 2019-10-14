import axios from 'axios';

export default axios.create({
    baseURL: "http://63c4b1b0.ngrok.io",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});