import { MuscleGroup } from "./muscle-group";

export type Exercise = {
	id: number;
	name: string;
	muscleGroups: Array<MuscleGroup>
}