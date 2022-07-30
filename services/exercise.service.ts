import { Exercise } from "models/exercise";
import { api } from "./api";

export default class ExerciseService {
	static getAll = async (): Promise<Array<Exercise>> => {
		const { data: exercises } = await api.get<Array<Exercise>>("/api/exercises");
		return exercises;
	};
}
