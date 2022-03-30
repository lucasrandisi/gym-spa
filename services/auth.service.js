import axios from "axios";

const API_URL = "http://localhost:8080";

class AuthService {
	login(username, password) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URL}/api/login`, { username, password })
				.then(res => {
					if (res.data) {
						localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
						localStorage.setItem("refresh_token", JSON.stringify(res.data.refresh_token));
					}
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 404) {
						//console.error(err);
					}
					reject(err.response.data.message);
				});
		});
	}

	logout() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
	}

	getToken() {
		return localStorage.getItem("access_token");
	}

	isAuthenticated() {
		return this.getToken() !== null;
	}
}
export default new AuthService();
