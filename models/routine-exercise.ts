import { Exercise } from "./exercise"

export type RoutineExercise = {
	id: number;
	exercise: Exercise;
	day: number;
	sets: number;
	reps: number;
	routine_id?: number
}