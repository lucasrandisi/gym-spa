import { Button, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup"; 
    


const Form = styled('form')({
	width: "30%",
});

export type MuscleGroupFormType = {
	name: String;
};

type MuscleGroupFormProps = {
	onSubmit: any;
	initialValues: MuscleGroupFormType
}

export function MuscleGroupForm({ onSubmit, initialValues }: MuscleGroupFormProps) {
	const formik = useFormik({
		initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: yup.object({
            name: yup.string().required()
        })
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
				sx={{ width: "100%", mb: 4 }}
			/>
			<Button color="primary" variant="contained" type="submit" fullWidth>
				Guardar
			</Button>
		</Form>
	);
}