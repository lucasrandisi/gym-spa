import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";

import { useAuth } from "security/auth.context";
import { useMutation } from "@tanstack/react-query";
import styles from "./login-form.module.scss";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Ingrese un email válido").required("Requerido"),
	password: Yup.string().required("Requerido"),
});

const initialValues = {
	email: "",
	password: "",
};

function LoginForm() {
	const auth = useAuth();

	const mutation = useMutation(
		["login"],
		({ email, password }: { email: string; password: string }) =>
			auth.login(email, password)
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={values => mutation.mutate(values)}
			validationSchema={loginSchema}>
			{({ values, touched, errors }) => (
				<Form className={styles.form}>
					<Field
						id="email"
						name="email"
						label="Email"
						as={TextField}
						fullWidth
						value={values.email}
						error={touched.email && errors.email}
						helperText={touched.email && errors.email}
						margin="dense"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<AlternateEmailIcon fontSize="small" />
								</InputAdornment>
							),
						}}
					/>

					<Field
						id="password"
						name="password"
						label="Password"
						type="password"
						as={TextField}
						fullWidth
						value={values.password}
						error={touched.password && errors.password}
						helperText={touched.password && errors.password}
						margin="dense"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<LockIcon fontSize="small" />
								</InputAdornment>
							),
						}}
					/>

					<Button
						color="primary"
						variant="contained"
						type="submit"
						disabled={mutation.isLoading}>
						{mutation.isLoading || auth.isLoading || auth.isAuthenticated ? (
							<CircularProgress size={22} />
						) : (
							"Iniciar Sesión"
						)}
					</Button>

					{mutation.isError && (
						<span className={styles.error}>{(mutation.error as Error).message}</span>
					)}
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
