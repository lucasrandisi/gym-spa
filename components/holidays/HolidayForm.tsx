import React from "react";
import * as Yup from "yup";
import { Grid, Button, DialogContent, DialogActions, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const initialValues = {
	name: "",
	description: "",
	date: "",
	openTime: "",
	closeTime: "",
};

export type HolidayFormValuesType = typeof initialValues;

const validationSchema = Yup.object({
	name: Yup.string().required("El nombre es requerido"),
	description: Yup.string().required("La fecha es requerida"),
	date: Yup.date().required("La fecha es requerida"),
});

interface HolidayFormProps {
	// eslint-disable-next-line no-unused-vars
	handleAdd: (values: HolidayFormValuesType) => void;
	handleClose: () => void;
}

const HolidayForm = ({ handleAdd, handleClose }: HolidayFormProps) => (
	<Formik
		initialValues={initialValues}
		onSubmit={handleAdd}
		validationSchema={validationSchema}>
		{({ errors, touched, handleChange }) => (
			<Form>
				<DialogContent sx={{ p: 2 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="name"
								type="text"
								label="Nombre"
								error={Boolean(touched.name && errors.name)}
								helperText={touched.name && errors.name}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="description"
								type="text"
								label="Descripción"
								error={Boolean(touched.description && errors.description)}
								helperText={touched.description && errors.description}
								onChange={handleChange}
							/>
							<TextField
								name="date"
								type="date"
								label="Fecha"
								error={Boolean(touched.date && errors.date)}
								helperText={touched.date && errors.date}
								onChange={handleChange}
							/>
							<TextField
								name="openTime"
								type="time"
								label="Desde"
								error={Boolean(touched.openTime && errors.openTime)}
								helperText={touched.openTime && errors.openTime}
								onChange={handleChange}
							/>
							<TextField
								name="closeTime"
								type="time"
								label="Hasta"
								error={Boolean(touched.closeTime && errors.closeTime)}
								helperText={touched.closeTime && errors.closeTime}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant="contained" color="primary" type="submit">
						Agregar
					</Button>
				</DialogActions>
			</Form>
		)}
	</Formik>
);

export default HolidayForm;
