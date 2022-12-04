import { Routine } from "models/routine";
import { api } from "./api";
import { Pageable } from "./Pageable";

export default class RoutineService {
	static findAllAssigned = async (id: Number, page: Number, size: Number) => {
		const { data: routines } = await api.get<Pageable<Routine>>(
			`/api/routines?member=${id}&page=${page}&size=${size}`
		);
		return routines;
	};
}
