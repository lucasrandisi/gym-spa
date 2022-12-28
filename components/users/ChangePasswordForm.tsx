import { Formik, Form } from "formik";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "services/api";
import { useSnackbar } from "notistack";

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
	);
}

export default ChangePasswordForm;