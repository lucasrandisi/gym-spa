import { RoutineExercise } from "./routine-exercise";

export type Routine = {
	id: number;
	name: string;
	routineExercises: Array<RoutineExercise>;
}