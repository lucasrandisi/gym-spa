import { api } from "./api";

type Credentials = {
	access_token: String,
	refresh_token: String
};

class AuthService {

	async login(username: string, password: string) : Promise<Credentials> {
		const { data: creds} = await api.post("/api/login", { username, password });
		localStorage.setItem("access_token", creds.access_token);
		localStorage.setItem("refresh_token", creds.refresh_token);
		return creds;
	}

	logout() : void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
	}

	getToken() : string | null {
		return localStorage.getItem("access_token");
	}

	isAuthenticated() : boolean {
		return this.getToken() !== null;
	}
}
export default new AuthService();
