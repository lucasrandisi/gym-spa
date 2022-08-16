import { api } from "./api";

export type User = {
	id: number;
	nroDoc: string;
	name: string;
	email: string;
	roles: string[];
};

class UserService {
	static me = async (): Promise<User> => {
		const { data: user } = await api.get<User>("/api/users/me");
		return user;
	};

	static getAll = async (): Promise<Array<User>> => {
		const { data: users } = await api.get<Array<User>>("/api/users");
		return users;
	};
}
export default UserService;
