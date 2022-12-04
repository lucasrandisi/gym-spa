import { Box, Button, styled, TextField } from "@mui/material";
import { FieldArray, Formik, useFormik } from "formik";
import { Exercise } from "models/exercise";
import React from "react";
import * as yup from "yup";
import { Routine } from "models/routine";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import UserSelector from "components/users/UserSelector";
import { User } from "models/user";
import {
	RoutineExercise,
	RoutineExercisesTable,
} from "../routine-exercises-table/RoutineExercisesTable";
import RoutineExerciseSubForm from "./RoutinesExcercisesSubform";

const Form = styled("form")({});

export type RoutineFormType = {
	user: User;
	name: string;
	from: Date | moment.Moment;
	to: Date | moment.Moment;
	exercises: RoutineExercise[];
};

type RoutineFormProps = {
	exercises: Array<Exercise>;
	onSubmit: any;
	routine?: Routine;
};

const exSchema = yup.object().shape({
	exercise: yup.object().required(),
	day: yup.number().min(1).max(7).required(),
	sets: yup.number().positive().required(),
	reps: yup.number().positive().required(),
});

const schema = yup.object().shape({
	user: yup.object().required(),
	name: yup.string().required("Requerido"),
	from: yup.date().required(),
	to: yup
		.date()
		.required()
		.min(yup.ref("from"), "Fecha vencimiento debe ser mayor a inicio"),
});

export function RoutineForm({ exercises, onSubmit, routine }: RoutineFormProps): any {
	const initialValues = {
		user: routine?.member,
		name: routine?.name ?? "",
		from: routine?.from ?? moment(),
		to: routine?.to ?? moment(),
		exercises: routine
			? routine.routineExercises.map(routineExercise => ({
					key: uuidv4(),
					id: routineExercise.exerciseId,
					name: routineExercise.name,
					day: routineExercise.day,
					sets: routineExercise.sets,
					reps: routineExercise.reps,
			  }))
			: [],
	};

	const handleSubmit = (values: RoutineFormType) => {
		onSubmit({
			user: { id: values.user.id },
			name: values.name,
			from: values.from,
			to: values.to,
			exercises: values.exercises,
		});
	};

	const routineExerciseFormik = useFormik({
		initialValues: {
			exercise: null,
			day: "",
			sets: "",
			reps: "",
		},
		validationSchema: exSchema,
		onSubmit: () => {},
	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={schema}>
			{routineFormik => (
				<Form
					onSubmit={routineFormik.handleSubmit}
					sx={{ width: "100%", display: "flex", flexDirection: "column" }}>

					<UserSelector
						label="Usuario"
						value={routineFormik.values.user}
						onChange={async value => routineFormik.setFieldValue("user", value)}
					/>

					<TextField
						id="name"
						name="name"
						label="Nombre"
						value={routineFormik.values.name}
						error={routineFormik.touched.name && Boolean(routineFormik.errors.name)}
						helperText={routineFormik.touched.name && routineFormik.errors.name}
						onChange={routineFormik.handleChange}
						required
						sx={{ width: "25%", mb: 2 }}
					/>

					<Box sx={{ display: "flex", gap: "16px" }}>
						<TextField
							name="from"
							label="Desde"
							type="date"
							value={routineFormik.values.from}
							error={routineFormik.touched.from && Boolean(routineFormik.errors.from)}
							helperText={routineFormik.touched.from && routineFormik.errors.from}
							onChange={routineFormik.handleChange}
							InputLabelProps={{ shrink: true }}
							sx={{ width: "25%", mb: 2 }}
						/>

						<TextField
							name="to"
							label="Vencimiento"
							type="date"
							value={routineFormik.values.to}
							error={routineFormik.touched.to && Boolean(routineFormik.errors.to)}
							helperText={routineFormik.touched.to && routineFormik.errors.to}
							onChange={routineFormik.handleChange}
							InputLabelProps={{ shrink: true }}
							sx={{ width: "25%", mb: 2 }}
						/>
					</Box>

					<FieldArray
						name="exercises"
						render={({ push, remove }) => (
							<div>
								<RoutineExerciseSubForm
									exercises={exercises}
									routineExerciseFormik={routineExerciseFormik}
									onExerciseAdd={push}
								/>
								<Box sx={{ mb: 4 }}>
									<RoutineExercisesTable
										routineExercises={routineFormik.values.exercises}
										removeRoutineExercise={remove}
									/>
								</Box>
							</div>
						)}
					/>

					<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							sx={{ width: "15%" }}>
							Guardar
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
}
