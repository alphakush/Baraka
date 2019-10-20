import axios from 'axios';

export default axios.create({
    baseURL: "http://489c0568.ngrok.io/api/v1",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});