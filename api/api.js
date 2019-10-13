import axios from 'axios';

export default axios.create({
    baseURL: "http://4f3d209b.ngrok.io ",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});