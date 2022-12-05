import { Formik, Form } from "formik";
import { Box, Button, Snackbar, TextField } from "@mui/material";
import * as Yup from "yup";
import React from "react";
import { setTimeout } from "timers";
import { useMutation } from "@tanstack/react-query";
import { api } from "services/api";

const initialValues = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
};
type PasswordChangeFormType = typeof initialValues;

const validationSchema = Yup.object()
	.shape({
		oldPassword: Yup.string().required("Requerido"),
		newPassword: Yup.string()
			.min(6, "La nueva contraseña debe tener al menos 6 caracteres")
			.required("Requerido"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("newPassword"), null], "Contaseñas deben coincidir")
			.required("Requerido"),
	})
	.required();

function ChangePasswordForm() {
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [snackbarText, setSnackbarText] = React.useState("");

	const mutation = useMutation(
		["change-password"],
		(values: PasswordChangeFormType) => api.put("/api/users/update-password", values),
		{
			onSuccess: () => {
				setSnackbarText("Contraseña cambiada con éxito");
				setOpenSnackbar(true);
			},
			onError: error => {
				setSnackbarText(JSON.stringify(error));
				setOpenSnackbar(true);
			},
			onSettled: () => {
				setTimeout(() => setOpenSnackbar(false), 3000);
			},
		}
	);

	return (
		<>
			<Snackbar
				open={openSnackbar}
				message={snackbarText}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={values => mutation.mutateAsync(values)}>
				{({ errors, touched, handleChange }) => (
					<Form>
						<h2>Cambiar contraseña</h2>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								maxWidth: "400px",
								gap: 1.5,
							}}>
							<TextField
								name="oldPassword"
								type="password"
								label="Contraseña actual"
								error={Boolean(touched.oldPassword && errors.oldPassword)}
								helperText={touched.oldPassword && errors.oldPassword}
								onChange={handleChange}
							/>
							<TextField
								name="newPassword"
								type="password"
								label="Nueva contraseña"
								error={Boolean(touched.newPassword && errors.newPassword)}
								helperText={touched.newPassword && errors.newPassword}
								onChange={handleChange}
							/>
							<TextField
								name="confirmPassword"
								type="password"
								label="Repertir nueva contraseña"
								error={Boolean(touched.confirmPassword && errors.confirmPassword)}
								helperText={touched.confirmPassword && errors.confirmPassword}
								onChange={handleChange}
							/>
						</Box>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={mutation.isLoading}
							sx={{ mt: 1 }}>
							Cambiar
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default ChangePasswordForm;
