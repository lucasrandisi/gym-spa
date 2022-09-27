/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import Cookies from "js-cookie";
import { User } from "models/user";
import { useRouter } from "next/router";
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import AuthService from "services/auth.service";
import UserService from "services/user.service";

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

	const refresh = async (): Promise<void> => {
		const token = AuthService.getRefreshToken();
		if (token) {
			await AuthService.refresh();
		}
	};

    const loadUser = useCallback(async () => {

        let token = AuthService.getToken();

        if (!token) {
            await refresh();
        }

        token = AuthService.getToken();
        if (token) {
            setToken(token);
            setIsAuthenticated(true);

            const user = await UserService.me();
            if (user) {
                setUser(user);
            }
        }
    }, []);
    
	const login = useCallback(
		async (username: string, password: string) => {
			setLoading(true);
			try {
				await AuthService.login(username, password);
				loadUser();
				setIsAuthenticated(true);
			} catch (error: any) {
				setUser(null);
				setIsAuthenticated(false);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[loadUser]
	);

	const logout = useCallback(() => {
		AuthService.logout();
		setToken(null);
		setUser(null);
		setLoading(false);
		setIsAuthenticated(false);
		router.push("/login");
	}, [router]);

	useEffect(() => {
		loadUser();
		setLoading(false);
	}, [loadUser]);

	const contextMemo = useMemo(
		() => ({
			user,
			isAuthenticated,
			login,
			logout,
			isLoading: loading,
			token,
		}),
		[isAuthenticated, loading, login, logout, token, user]
	);

	return <AuthContext.Provider value={contextMemo}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
