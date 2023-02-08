import React from "react";
import * as Yup from "yup";
import {
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	Button,
	IconButton,
	Tooltip,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";

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
	object?: PackageFormValuesType;
	edit?: boolean;
	onCancel?: () => void;
}

const PackageForm2 = ({ object, edit, onCancel }: PackageFormProps) => {
	const readOnly = !edit;

	const handleSave = (values: PackageFormValuesType) => {
		console.log(values);
	};

	const handleCancel = () => {
		onCancel && onCancel();
	};

	const createPackage = () => {
		console.log("Create");
	};

	const updatePackage = () => {
		console.log("Update");
	};

	return (
		<Formik
			initialValues={{ ...initialValues, ...object }}
			validationSchema={validationSchema}
			onSubmit={handleSave}>
			{({ errors, touched, handleChange, values, resetForm }) => (
				<Form>
					<Grid container rowGap={2} columnSpacing={2}>
						<Grid item xs={6}>
							<TextField
								name="name"
								type="text"
								label="Nombre"
								value={values.name}
								error={Boolean(touched.name && errors.name)}
								helperText={touched.name && errors.name}
								onChange={handleChange}
								fullWidth
								InputProps={{ readOnly }}
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
								value={values.description}
								error={Boolean(touched.description && errors.description)}
								helperText={touched.description && errors.description}
								onChange={handleChange}
								fullWidth
								InputProps={{ readOnly }}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="duration"
								type="number"
								label="Duración"
								value={values.duration}
								error={Boolean(touched.duration && errors.duration)}
								helperText={touched.duration && errors.duration}
								onChange={handleChange}
								fullWidth
								InputProps={{ readOnly }}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name="price"
								type="number"
								label="Precio"
								value={values.price}
								error={Boolean(touched.price && errors.price)}
								helperText={touched.price && errors.price}
								onChange={handleChange}
								fullWidth
								InputProps={{
									readOnly,
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
								value={values.active}
								error={Boolean(touched.active && errors.active)}
								helperText={touched.active && errors.active}
								onChange={handleChange}
								InputProps={{ readOnly }}
							/>
						</Grid>

						<Grid item xs={12}>
							{edit && (
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
										gap: 1,
									}}>
									<Button
										type="button"
										onClick={() => {
											handleCancel();
											resetForm();
										}}
										variant="outlined">
										Cancelar
									</Button>
									<Button
										type="submit"
										onClick={updatePackage}
										variant="contained"
										color="primary">
										Guardar
									</Button>
								</Box>
							)}
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default PackageForm2;
