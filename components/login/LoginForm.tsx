import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

import { Button, InputAdornment, TextField } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";

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
		response: null,
		error: null,
	});

	return (
		<div>
			<div>
				{state.error && "Error"}
				{state.loading && <div>Loading...</div>}
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={({ email, password }) => {
					setState({ ...state, loading: true });
					const body = { username: email, password };
					window.alert(JSON.stringify(body));

					fetch("http://localhost:8080/api/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					})
						.then(res => res.json())
						.then(res => {
							window.alert(JSON.stringify(res));
							if (res.status !== 200) {
								window.alert("!!!!!!!!!!!!!!!!	");
								throw new Error(res.status);
							}
							return res;
						})
						.then(response =>
							setState({
								loading: false,
								response,
								error: null,
							})
						)
						.catch(error =>
							setState({
								loading: false,
								response: null,
								error,
							})
						)
						.finally(() => setState({ ...state, loading: false }));
				}}
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
