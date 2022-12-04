import { User } from "models/user";
import { api } from "./api";

export type SearchType = {
	name: String;
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

	static search = async (search: SearchType) => {
		let query = "";
		Object.entries(search).forEach((key, value) => {
			if (value) {
				query += `${key}=${value}&`;
			}
		});
		const { data: users } = await api.get<Array<User>>(`/api/users/search?${query}`);
		return users;
	};

	static searchByName = async (name: String) => {
		const { data: users } = await api.get<Array<User>>(`/api/users/search?name=${name}`);
		return users;
	};
}
export default UserService;
