import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export type RoutineExercise = {
	key: string;
	name: String;
	day: number;
	sets: number;
	reps: number;
};

type RoutineExercisesTableProps = {
	routineExercises: RoutineExercise[];
	removeRoutineExercise: Function;
};

export function RoutineExercisesTable({
	routineExercises,
	removeRoutineExercise,
}: RoutineExercisesTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Día</TableCell>
						<TableCell>Ejercicio</TableCell>
						<TableCell>Sets</TableCell>
						<TableCell>Reps</TableCell>
						<TableCell />
					</TableRow>
				</TableHead>
				<TableBody>
					{routineExercises.map(routineExercise => (
						<TableRow key={routineExercise.key}>
							<TableCell>{routineExercise.day}</TableCell>
							<TableCell>{routineExercise.name}</TableCell>
							<TableCell>{routineExercise.sets}</TableCell>
							<TableCell>{routineExercise.reps}</TableCell>
							<TableCell>
								<IconButton
									onClick={() => removeRoutineExercise(routineExercise.key)}
									aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}