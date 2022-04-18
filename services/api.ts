import Axios from "axios";
import authService from "./auth.service";

const URL = {
    "production": process.env.NEXT_PUBLIC_BACKEND_URL, 
    "development": "http://localhost:8080/",
    "test": "http://localhost:8080/"
};

export const api = Axios.create({
    baseURL: URL[process.env.NODE_ENV],
    headers: {
        Accept: 'application/json'
    }
  });

// req interceptor adds bearer token and headers
api.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if(token){
            config.headers!.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// res interceptor handles errors
api.interceptors.response.use(
    (response) => {
        if([401, 403].indexOf(response.status) !== -1) {
            console.log("Unauthorized");
        }
        return response;
    }, 
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
});
