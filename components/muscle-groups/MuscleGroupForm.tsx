import { Button, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";



const Form = styled('form')({
	width: "30%",
});

export type MuscleGroupForm = {
	name: String;
};

type MuscleGroupFormProps = {
	onSubmit: any;
	initialValues: MuscleGroupForm
}

export function MuscleGroupForm({ onSubmit, initialValues }: MuscleGroupFormProps) {
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