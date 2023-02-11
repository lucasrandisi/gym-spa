import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	Button,
	MenuItem,
	ButtonBase,
	Popover,
	Select,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Box } from "@mui/system";
import { TwitterPicker } from "react-color";

const initialValues = {
	name: "",
	description: "",
	active: false,
	duration: 30,
	durationType: "days",
	price: 0,
	color: "#000000",
};

export type PackageFormValuesType = typeof initialValues;

const validationSchema = Yup.object({
	name: Yup.string().required("Requerido"),
	description: Yup.string().optional(),
	active: Yup.boolean().required("Requerido"),
	duration: Yup.number().positive().required("Requerido"),
	durationType: Yup.string().required("Requerido"),
	price: Yup.number().required("Requerido"),
	color: Yup.string().optional(),
});

interface PackageFormProps {
	object?: PackageFormValuesType;
	edit?: boolean;
	onCancel?: () => void;
}

const PackageForm2 = ({ object, edit, onCancel }: PackageFormProps) => {
	const readOnly = !edit;

	const [open, setOpen] = useState(false);
	const anchorRef = useRef<any>(null);

	const handleClose = (e: React.MouseEvent<Document, MouseEvent>) => {
		if (anchorRef.current && anchorRef.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false && anchorRef.current) {
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open]);

	const handleSave = (values: PackageFormValuesType) => {
		console.log(values);
	};

	const handleCancel = () => {
		if (onCancel) onCancel();
	};

	const updatePackage = () => {
		console.log("Update");
	};

	return (
		<Formik
			initialValues={{ ...initialValues, ...object }}
			validationSchema={validationSchema}
			onSubmit={handleSave}>
			{({ errors, touched, handleChange, values, resetForm, setFieldValue }) => (
				<Form>
					<Grid container rowGap={2} columnSpacing={2}>
						<Grid item xs={10}>
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

						<Grid item xs={2}>
							<ButtonBase
								onClick={handleToggle}
								disabled={readOnly}
								sx={{
									width: "36px",
									height: "36px",
									borderRadius: "6px",
									border: "2px solid transparent",
									boxSizing: "border-box",
									backgroundColor: "transparent",
									cursor: "pointer",
									outline: "none",
									"&:hover": {
										borderColor: "#4C9AFF",
									},
									...(open && {
										borderColor: "#4C9AFF",
									}),
								}}>
								<Box
									ref={anchorRef}
									aria-controls={open ? "menu-list-grow" : undefined}
									aria-haspopup="true"
									sx={{
										width: "30px",
										height: "30px",
										borderRadius: "3px",
										background: values.color,
										boxShadow: "inset 0px 0px 0px 1px rgba(13,20,36,0.18)",
									}}
								/>
							</ButtonBase>

							<Popover
								id="colo-picker-menu"
								open={open}
								anchorEl={anchorRef.current}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								sx={{
									marginBlockStart: "10px",
								}}>
								<TwitterPicker
									color={values.color}
									onChangeComplete={color => setFieldValue("color", color.hex)}
									triangle="top-left"
								/>
							</Popover>
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
							<Select
								name="durationType"
								value={values.durationType}
								onChange={handleChange}
								readOnly={readOnly}>
								<MenuItem value="days">Días</MenuItem>
								<MenuItem value="weeks">Semanas</MenuItem>
								<MenuItem value="months">Meses</MenuItem>
								<MenuItem value="years">Años</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="price"
								type="number"
								label="Precio"
								value={values.price}
								error={Boolean(touched.price && errors.price)}
								helperText={touched.price && errors.price}
								onChange={handleChange}
							
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

PackageForm2.propTypes = {
	edit: PropTypes.bool,
	onCancel: PropTypes.func,
};

PackageForm2.defaultProps = {
	object: {},
	edit: false,
	onCancel: () => {},
};

export default PackageForm2;
