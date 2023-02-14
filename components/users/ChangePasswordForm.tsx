import { Formik, Form } from "formik";
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "services/api";
import { useSnackbar } from "notistack";
import { calculatePasswordStrength, strengths } from "security/password-strength";

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
	const { enqueueSnackbar } = useSnackbar();
	const [passwordStrength, setPasswordStrength] = useState(strengths[0]);

	const mutation = useMutation(
		["change-password"],
		(values: PasswordChangeFormType) => api.put("/api/users/update-password", values),
		{
			onSuccess: () => {
				enqueueSnackbar("Contraseña cambiada con éxito", { variant: "success" });
			},
			onError: error => {
				enqueueSnackbar(JSON.stringify(error), { variant: "error" });
			},
		}
	);

	const handleNewPasswordChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const password = event.target.value;
		const { level, label, color } = calculatePasswordStrength(password);
		setPasswordStrength({ level, color, label });
	};

	return (
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
							onChange={event => {
								handleChange(event);
								handleNewPasswordChange(event);
							}}
						/>

						{passwordStrength && (
							<FormControl fullWidth>
								<Box>
									<Grid container spacing={2} alignItems="center">
										<Grid item>
											<Box
												style={{ backgroundColor: passwordStrength.color }}
												sx={{ width: 85, height: 8, borderRadius: "7px" }}
											/>
										</Grid>
										<Grid item>
											<Typography variant="subtitle1" fontSize="0.75rem">
												{passwordStrength.label}
											</Typography>
										</Grid>
									</Grid>
								</Box>
							</FormControl>
						)}

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
	);
}

export default ChangePasswordForm;
