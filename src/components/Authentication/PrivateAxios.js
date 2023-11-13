import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const axiosPrivate = axios.create({
    headers: { 'Content-Type': 'application/json' },
  });

  useEffect(() => {

    const requestIntercept=axiosPrivate.interceptors.request.use(
      (config) => {
        if (auth.jwt) {
          console.log("am pus header Authorization");
          config.headers['Authorization'] = `Bearer `+auth.jwt;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    
     return ()=>{
       axiosPrivate.interceptors.request.eject(requestIntercept);
     }
  }, [auth.jwt]);

  return axiosPrivate;
};

export default useAxiosPrivate;