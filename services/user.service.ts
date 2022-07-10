import { api } from "./api";

export type User = {
    id: number,
    nroDoc: string,
	name: string;
	email: string;
};

class UserService{
	me = async () : Promise<User> => {
		const { data: user } = await api.get<User>("/api/users/me");
		return user;
	};
}
export default new UserService();
