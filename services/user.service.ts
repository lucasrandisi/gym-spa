import { api } from "./api";

export type User = {
	id: number,
	email: string;
	name: string;
};

class UserService{
	me = async () : Promise<User> => {
		const { data: user } = await api.get<User>("/api/users/me");
		return user;
	};
}
export default new UserService();
