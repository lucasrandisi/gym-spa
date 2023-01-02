import React from "react";
import * as Yup from "yup";
import { Grid, Button, DialogContent, DialogActions, TextField } from "@mui/material";
import { Form, Formik } from "formik";

const initialValues = {
	name: "",
	address: "",
	phone: "",
};

export type LocationFormValuesType = typeof initialValues;

const validationSchema = Yup.object({
	name: Yup.string().required("El nombre es requerido"),
	address: Yup.string().required("La dirección es requerida"),
	phone: Yup.string().required("El teléfono es requerido"),
});

interface LocationFormProps {
	// eslint-disable-next-line no-unused-vars
	handleAdd: (values: LocationFormValuesType) => void;
	handleClose: () => void;
}

const LocationForm = ({ handleAdd, handleClose }: LocationFormProps) => (
	<Formik
		initialValues={initialValues}
		onSubmit={handleAdd}
		validationSchema={validationSchema}>
		{({ errors, touched, handleChange }) => (
			<Form>
				<DialogContent sx={{ p: 2 }}>
					<Grid container spacing={2} >
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
								name="address"
								type="text"
								label="Dirección"
								error={Boolean(touched.address && errors.address)}
								helperText={touched.address && errors.address}
								onChange={handleChange}
							/>
							<TextField
								name="phone"
								type="text"
								label="Teléfono"
								error={Boolean(touched.phone && errors.phone)}
								helperText={touched.phone && errors.phone}
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

export default LocationForm;
