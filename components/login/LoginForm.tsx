import React, { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { Button, InputAdornment, TextField } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";

import { useAuthentication } from "session/AuthenticationProvider";
import authService from "../../services/auth.service";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Ingrese un email válido").required("Requerido"),
	password: Yup.string().required("Requerido"),
});

const initialValues = {
	email: "",
	password: "",
};

function LoginForm() {
	const [state, setState] = useState({
		loading: false,
		error: null,
	});

	const router = useRouter();
	const auth = useAuthentication();

	const login = async ({ email, password }: any) => {
		setState({ ...state, loading: true });
		authService
			.login(email, password)
			.then(() => {
				auth.login();
				router.push("/");
			})
			.catch(err => setState({ ...state, error: err }))
			.finally(() => setState({ ...state, loading: false }));
	};

	return (
		<div>
			<div>
				{state.error && <div>{state.error}</div>}
				{state.loading && <div>Loading...</div>}
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={values => login(values)}
				validationSchema={loginSchema}
			>
				{({ values, touched, errors }) => (
					<Form>
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

						<Button color="primary" variant="contained" type="submit">
							Iniciar Sesión
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default LoginForm;
