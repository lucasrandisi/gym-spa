import { api } from "./api";
import Cookies from 'js-cookie'

type Credentials = {
	access_token: string,
	refresh_token: string
};

class AuthService {

	login = async (username: string, password: string): Promise<Credentials> => {
		const { data: creds} = await api.post<Credentials>("/api/login", { username, password });
		this.persist(creds)
		return creds;
	}

	refresh = async (): Promise<Credentials> => {
		const token = this.getRefreshToken();
		if(!token) return Promise.reject("No refresh token provided");
		
		let config = {
			headers: {
				authorization: `Bearer ${token}`
			}
		}
		const { data: creds} = await api.post<Credentials>("/api/refreshToken", null, config);
		this.persist(creds)
		return creds;
	}

	persist = (creds: Credentials): void  => {
		Cookies.set('access_token', creds.access_token, { expires: new Date(new Date().getTime() + 30 * 1000) })
		Cookies.set('refresh_token', creds.refresh_token, { expires: new Date(new Date().getTime() + 60 * 1000) })
	}

	logout = (): void => {
		Cookies.remove("access_token");
		Cookies.remove("refresh_token");
	}

	getToken = (): string | undefined => {
		return Cookies.get("access_token");
	}

	getRefreshToken = (): string | undefined => {
		return  Cookies.get("refresh_token");
	}

	isAuthenticated = (): boolean => {
		return this.getToken() !== null;
	}
}
export default new AuthService();
