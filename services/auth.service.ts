import Cookies from "js-cookie";
// eslint-disable-next-line import/no-cycle
import { api } from "./api";

type Credentials = {
	access_token: string;
	refresh_token: string;
};

class AuthService {
	static login = async (username: string, password: string): Promise<Credentials> => {
		const { data: creds } = await api.post<Credentials>("/api/login", {
			username,
			password,
		});
		AuthService.persist(creds);
		return creds;
	};

	static refresh = async (): Promise<Credentials> => {
		const token = AuthService.getRefreshToken();
		if (!token) return Promise.reject(new Error("No refresh token provided"));

		const config = {
			headers: {
				authorization: `Bearer ${token}`,
			},
		};
		const { data: creds } = await api.post<Credentials>(
			"/api/refreshToken",
			null,
			config
		);
		AuthService.persist(creds);
		return creds;
	};

	static persist = (creds: Credentials): void => {
		Cookies.set("access_token", creds.access_token, {
			expires: new Date(new Date().getTime() + 30 * 1_000_000),
		});
		Cookies.set("refresh_token", creds.refresh_token, {
			expires: new Date(new Date().getTime() + 60 * 1_000_000),
		});
	};

	static logout = (): void => {
		Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user");
	};

	static getToken = () => Cookies.get("access_token");

	static getRefreshToken = () => Cookies.get("refresh_token");

	static isAuthenticated = () => this.getToken() !== null;
}
export default AuthService;
