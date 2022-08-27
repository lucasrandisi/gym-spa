import { Button, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";


const Form = styled('form')({
	width: "30%",
});


export type RoutineFormType = {
	name: String;
	routineExercises: Array<{
		exerciseId: number,
		day: number,
		sets: number,
		reps: number
	}>
};

type RoutineFormProps = {
	onSubmit: any;
	initialValues: RoutineFormType
}

export function RoutineForm({ onSubmit, initialValues }: RoutineFormProps) {
	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: onSubmit
	});
	return (
		<Form onSubmit={formik.handleSubmit} >
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
			<Button color="primary" variant="contained" type="submit" fullWidth>
				Guardar
			</Button>
		</Form>
	);
}