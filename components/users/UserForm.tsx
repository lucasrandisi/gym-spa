import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Rol } from "models/rol";
import { Routine } from "models/routine";
import React from "react";
import * as yup from 'yup';


const Form = styled('form')({
	width: "30%",
});

export type UserForm = {
    name: string;
    email: string;
    password?: string;
    nroDoc: string;
    rolId: number;
    routineId: string | number;
};

type UserFormProps = {
	onSubmit: any;
    initialValues: UserForm;
    roles: Rol[];
    routines: Routine[];
    passwordInput: boolean;
    submitError: null | string;
}

export function UserForm({ onSubmit, initialValues, roles, routines, passwordInput, submitError }: UserFormProps) {
	const formik = useFormik({
		initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: yup.object().shape({
            name: yup.string().required("Campo requerido"),
            email: yup.string().email("Debe ser un email válido").required("Campo requerido"),
            ...(passwordInput && { password: yup.string().required("Campo requerido") }),
            nroDoc: yup.string().required("Campo requerido"),
            rolId: yup.number().required("Campo requerido"),
        })
    });
    
	return (
		<Form onSubmit={formik.handleSubmit} >
			<TextField
				id="name"
				name="name"
				label="Nombre"
				value={formik.values.name}
				onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
				sx={{ width: "100%", mb: 2 }}
            />
            <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ width: "100%", mb: 2 }}
            />
            { passwordInput && <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ width: "100%", mb: 2 }}
            /> }
            <TextField
                id="nroDoc"
                name="nroDoc"
                label="Número de Documento"
                value={formik.values.nroDoc}
                onChange={formik.handleChange}
                error={formik.touched.nroDoc && Boolean(formik.errors.nroDoc)}
                helperText={formik.touched.nroDoc && formik.errors.nroDoc}
                sx={{ width: "100%", mb: 2 }}
            />
            <FormControl sx={{ width: "100%", mb: 2 }}>
                <InputLabel>Rol</InputLabel>
                <Select
                    id="rolId"
                    name="rolId"
                    value={formik.values.rolId}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.rolId)}
                    input={<OutlinedInput label="Rol" />}>
                    {roles.map((rol) => (
                        <MenuItem key={rol.id} value={rol.id}>
                            {rol.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ width: "100%", mb: 6 }}>
                <InputLabel>Rutina</InputLabel>
                <Select
                    id="routineId"
                    name="routineId"
                    value={formik.values.routineId}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.routineId)}
                    input={<OutlinedInput label="Rutina" />}>
                    {routines.map((routine) => (
                        <MenuItem key={routine.id} value={routine.id}>
                            {routine.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


			<Button color="primary" variant="contained" type="submit" fullWidth>
				Guardar
            </Button>
            
            {submitError && <Box sx={{mt: 4, textAlign: "center", color: "red"}}>{submitError}</Box>}
		</Form>
	);
}