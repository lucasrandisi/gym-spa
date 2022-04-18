import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";
import userService from "services/user.service";

type User = {
	email: string;
	name: string;
};

export interface UserContext {
	user: User | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
	token: string | null;
}

const AuthContext = createContext<UserContext>({} as UserContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);

	const router = useRouter();

	useEffect(() => {
		loadUser();
		setLoading(false);
	}, []);

	const loadUser = async () => {
		const token = localStorage.getItem("access_token");
		if (token) {
			setToken(token);
			setIsAuthenticated(true);
			const user = await userService.me();
			if (user) setUser(user);
		}
	};

	const login = async (username: string, password: string) => {
		setLoading(true);
		try {
			await authService.login(username, password);
			loadUser();
		} catch (error: any) {
			setUser(null);
			throw error.message;
		}
		setLoading(false);
	};

	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");

		authService.logout();

		setUser(null);
		setLoading(false);

		router.push("/login");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
				isLoading: loading,
				token,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
