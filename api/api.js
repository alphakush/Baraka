import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    baseURL: "https://baraka-api.herokuapp.com/api/v1",
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        }
});

instance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  
  export default instance;
