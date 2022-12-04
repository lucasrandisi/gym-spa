import React, { useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { Exercise } from "models/exercise";
import { v4 as uuidv4 } from "uuid";
import styles from "./routine-form.module.scss";

const dias = [1, 2, 3, 4, 5, 6, 7];

type RoutineExercisesFormProps = {
	exercises: Exercise[];
	routineExerciseFormik: any;
	onExerciseAdd: (object: any) => void;
};

const RoutineExerciseSubForm = ({
	exercises,
	routineExerciseFormik,
	onExerciseAdd: addExercise,
}: RoutineExercisesFormProps) => {
	const [exercise, setExercise] = useState<Exercise | null>(null);

	return (
		<Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 3 }}>
			<Autocomplete
				options={exercises}
				value={exercise}
				getOptionLabel={(exercise: Exercise) => exercise.name}
				onChange={(_, value) => setExercise(value)}
				autoSelect
				autoHighlight
				sx={{ width: "25%", mr: 2 }}
				renderInput={params => (
					<TextField
						{...params}
						error={Boolean(routineExerciseFormik.errors.exercise)}
						label="Ejercicio"
						type="outlined"
					/>
				)}
			/>
			<FormControl sx={{ width: "7%", mr: 2 }}>
				<InputLabel>Día</InputLabel>
				<Select
					name="day"
					value={routineExerciseFormik.values.day}
					onChange={routineExerciseFormik.handleChange}
					error={Boolean(routineExerciseFormik.errors.day)}
					input={<OutlinedInput label="Día" />}>
					{dias.map((dia: any) => (
						<MenuItem key={dia} value={dia}>
							{dia}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				name="sets"
				label="Sets"
				value={routineExerciseFormik.values.sets}
				onChange={routineExerciseFormik.handleChange}
				error={Boolean(routineExerciseFormik.errors.sets)}
				type="number"
				sx={{ width: "7%", mr: 2 }}
				className={styles.numberInput}
			/>
			<TextField
				name="reps"
				label="Reps"
				value={routineExerciseFormik.values.reps}
				onChange={routineExerciseFormik.handleChange}
				error={Boolean(routineExerciseFormik.errors.reps)}
				type="number"
				sx={{ width: "7%", mr: 2 }}
				className={styles.numberInput}
			/>
			<Button
				color="primary"
				size="medium"
				variant="contained"
				onClick={() =>
					addExercise({
						key: uuidv4(),
						id: exercise?.id,
						name: exercise?.name,
						day: Number(routineExerciseFormik.values.day),
						sets: Number(routineExerciseFormik.values.sets),
						reps: Number(routineExerciseFormik.values.reps),
					})
				}
				sx={{ width: "7%", height: "100%" }}>
				Agregar
			</Button>
		</Box>
	);
};

export default RoutineExerciseSubForm;
