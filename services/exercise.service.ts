import { ExerciseFormType } from "components/exercise/ExerciseForm";
import { Exercise } from "models/exercise";
import { MuscleGroup } from "models/muscle-group";
import { api } from "./api";

export default class ExerciseService {
	static get = async (id: string): Promise<Exercise> => {
		const { data: exercise } = await api.get<Exercise>(`/api/exercises/${id}`);
		return exercise;
	};

	static getAll = async (): Promise<Array<Exercise>> => {
		const { data: exercises } = await api.get<Array<Exercise>>("/api/exercises");
		return exercises;
	};

	static async create(values: ExerciseFormType) {
		const { data: exercise } = await api.post<Exercise>("/api/exercises", values);
		return exercise;
	}

	static async edit(id: string, values: ExerciseFormType) {
		const { data: exercise } = await api.put<Exercise>(`/api/exercises/${id}`, values);
		return exercise;
	}

	static delete = async (id: string) => {
		await api.delete(`/api/exercises/${id}`);
	};

	static getAllMuscles = async () => {
		const { data: group } = await api.get<Array<MuscleGroup>>("/api/muscle-groups");
		return group;
	};
}
