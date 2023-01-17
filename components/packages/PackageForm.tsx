import React from "react";
import * as Yup from "yup";
import {
	Grid,
	Button,
	DialogContent,
	DialogActions,
	TextField,
	Checkbox,
	FormControlLabel,
	InputAdornment,
} from "@mui/material";
import { Field, Form, Formik } from "formik";

const initialValues = {
	name: "",
	description: "",
	active: false,
	duration: 30,
	price: 0,
};

export type PackageFormValuesType = typeof initialValues;

const validationSchema = Yup.object({
	name: Yup.string().required("Requerido"),
	description: Yup.string().optional(),
	active: Yup.boolean().required("Requerido"),
	duration: Yup.number().positive().required("Requerido"),
	price: Yup.number().positive().required("Requerido"),
});

interface PackageFormProps {
	// eslint-disable-next-line no-unused-vars
	handleAdd: (values: PackageFormValuesType) => void;
	handleClose: () => void;
}

const PackageForm = ({ handleAdd, handleClose }: PackageFormProps) => (
	<Formik
		initialValues={initialValues}
		onSubmit={handleAdd}
		validationSchema={validationSchema}>
		{({ errors, touched, handleChange }) => (
			<Form>
				<DialogContent sx={{ p: 2 }}>
					<Grid container rowGap={2} columnSpacing={2}>
						<Grid item xs={6}>
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
								placeholder="Esta descrpción será visible para los clientes."
								multiline
								rows={2}
								maxRows={4}
								error={Boolean(touched.description && errors.description)}
								helperText={touched.description && errors.description}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="duration"
								type="number"
								label="Duración"
								error={Boolean(touched.duration && errors.duration)}
								helperText={touched.duration && errors.duration}
								onChange={handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="price"
								type="number"
								label="Precio"
								error={Boolean(touched.price && errors.price)}
								helperText={touched.price && errors.price}
								onChange={handleChange}
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<Field
								type="checkbox"
								name="active"
								as={FormControlLabel}
								control={<Checkbox />}
								label="Activo"
								error={Boolean(touched.active && errors.active)}
								helperText={touched.active && errors.active}
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

export default PackageForm;
