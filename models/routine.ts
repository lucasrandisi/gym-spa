import { RoutineExercise } from "./routine-exercise";

export type Routine = {
	id: number;
	name: string;
	routineExercises: Array<RoutineExercise>;
	creator: String;
	user: String;
	from: Date;
	to: Date;
	createdAt: Date;
	updatedAt: Date;
}