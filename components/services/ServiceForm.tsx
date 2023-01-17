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

export type ServiceFormValuesType = typeof initialValues;

const validationSchema = Yup.object({
	name: Yup.string().required("Requerido"),
	description: Yup.string().optional(),
	date: Yup.date().required("Requerida"),
});

interface ServiceFormProps {
	// eslint-disable-next-line no-unused-vars
	handleAdd: (values: ServiceFormValuesType) => void;
	handleClose: () => void;
}

const ServiceForm = ({ handleAdd, handleClose }: ServiceFormProps) => (
	<Formik
		initialValues={initialValues}
		onSubmit={handleAdd}
		validationSchema={validationSchema}>
		{({ errors, touched, handleChange }) => (
			<Form>
				<DialogContent sx={{ p: 2 }}>
					<Grid container rowGap={3}>
						<Grid item xs={12}>
							<TextField
								name="name"
								type="text"
								label="Nombre"
								error={Boolean(touched.name && errors.name)}
								helperText={touched.name && errors.name}
								onChange={handleChange}
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
								fullWidth
							/>
						</Grid>
						<Grid container xs={12} gap={2}>
							<TextField
								name="date"
								type="date"
								label="Fecha"
								error={Boolean(touched.date && errors.date)}
								helperText={touched.date && errors.date}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								name="openTime"
								type="time"
								label="Desde"
								error={Boolean(touched.openTime && errors.openTime)}
								helperText={touched.openTime && errors.openTime}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								name="closeTime"
								type="time"
								label="Hasta"
								error={Boolean(touched.closeTime && errors.closeTime)}
								helperText={touched.closeTime && errors.closeTime}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
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

export default ServiceForm;
