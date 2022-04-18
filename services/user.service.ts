import { api } from "./api";

class UserService{
	me = async () => {
		const { data: user } = await api.get("/api/users/me");
		return user;
	};
}
export default new UserService();
