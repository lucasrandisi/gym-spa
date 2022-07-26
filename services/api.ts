import Axios from "axios";
// eslint-disable-next-line import/no-cycle
import authService from "./auth.service";

const URL = {
	production: process.env.NEXT_PUBLIC_BACKEND_URL,
	development: "http://localhost:8080/",
	test: "http://localhost:8080/",
};

// eslint-disable-next-line import/prefer-default-export
export const api = Axios.create({
	baseURL: URL[process.env.NODE_ENV],
	headers: {
		Accept: "application/json",
	},
});

// req interceptor adds bearer token and headers
api.interceptors.request.use(
	config => {
		const token = authService.getToken();
		if (token) {
			// eslint-disable-next-line no-param-reassign
			config.headers = {
				...config.headers,
				authorization: `Bearer ${token}`,
			};
		}
		return config;
	},
	error => Promise.reject(error)
);

// res interceptor handles errors
api.interceptors.response.use(
	response => {
		if ([401, 403].indexOf(response.status) !== -1) {
			throw new Error("Unauthorized");
		}
		return response;
	},
	error => {
		if (error.response && error.response.data) {
			return Promise.reject(error.response.data);
		}
		return Promise.reject(error.message);
	}
);
