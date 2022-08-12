import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	styled,
	TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { MuscleGroup } from "models/muscle-group";
import React from "react";

const Form = styled("form")({
	width: "30%",
});

export type ExerciseFormType = {
	name: String;
	muscleGroupIds: Array<Number>;
};

type ExerciseFormProps = {
	muscleGroups: Array<MuscleGroup>;
	onSubmit: any;
	initialValues: ExerciseFormType;
};

export function ExerciseForm({
	muscleGroups,
	onSubmit,
	initialValues,
}: ExerciseFormProps) {
	const formik = useFormik({
		initialValues,
		onSubmit,
	});
	return (
		<Form onSubmit={formik.handleSubmit}>
			<TextField
				id="name"
				name="name"
				label="Nombre"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.touched.name && Boolean(formik.errors.name)}
				helperText={formik.touched.name && formik.errors.name}
				sx={{ width: "100%", mb: 2 }}
			/>
			<FormControl sx={{ width: "100%", mb: 4 }}>
				<InputLabel id="demo-multiple-name-label">Músculos</InputLabel>
				<Select
					id="muscleGroupIds"
					name="muscleGroupIds"
					multiple
					value={formik.values.muscleGroupIds}
					onChange={formik.handleChange}
					input={<OutlinedInput label="Músculos" />}>
					{muscleGroups.map((muscleGroup: any) => (
						<MenuItem key={muscleGroup.id} value={muscleGroup.id}>
							{muscleGroup.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Button color="primary" variant="contained" type="submit" fullWidth>
				Submit
			</Button>
		</Form>
	);
}
