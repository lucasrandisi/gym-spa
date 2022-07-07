import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "services/auth.service";
import userService, { User } from "services/user.service";

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
		var token = authService.getToken();

		if (!token) {
			await refresh();
		}

		token = authService.getToken();
		if (token) {
			setToken(token);
			setIsAuthenticated(true);

			const user = await userService.me();
			if (user) {
				setUser(user);
			}
		}
	};

	const login = async (username: string, password: string) => {
		setLoading(true);
		try {
			await authService.login(username, password);
			loadUser();
		} catch (error: any) {
			setUser(null);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		authService.logout();
		setToken(null);
		setUser(null);
		setLoading(false);
		setIsAuthenticated(false);
		router.push("/login");
	};

	const refresh = async (): Promise<void> => {
		const token = authService.getRefreshToken();
		if (token) {
			await authService.refresh();
		}
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
