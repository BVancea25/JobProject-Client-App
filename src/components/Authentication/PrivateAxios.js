import axios from 'axios';


const axiosPrivate= axios.create({
  headers:{"Content-Type":"application/json"}
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token=localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      config.headers['Authorization'] = token;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPrivate;
