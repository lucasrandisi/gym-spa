import { Autocomplete, Box, Button, FormControl, InputLabel, makeStyles, MenuItem, OutlinedInput, Select, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Exercise } from "models/exercise";
import React from "react";
import styles from './routine-form.module.scss';

const Form = styled('form')({
	width: "30%",
});


export type RoutineFormType = {
	name: String;
	routineExercises: Array<{
		exerciseId: number,
		day: number,
		sets: number,
		reps: number
	}>
};

type RoutineFormProps = {
	onSubmit: any;
    initialValues: RoutineFormType,
    exercises: Array<Exercise>
}

const dias = [
    { number: 1, name: 'Lunes' },
    { number: 2, name: 'Martes' },
    { number: 3, name: 'Miércoles' },
    { number: 4, name: 'Jueves' },
    { number: 5, name: 'Viernes' },
    { number: 6, name: 'Sábado' },
    { number: 7, name: 'Domingo' },
]

export function RoutineForm({ onSubmit, initialValues, exercises }: RoutineFormProps) {
	const formik = useFormik({
        initialValues: {
            exerciseId: '',
            day: '',
            sets: '',
            reps: '',
            ...initialValues
        },
		onSubmit: onSubmit
    });

	return (
		<Form onSubmit={formik.handleSubmit} sx={{width: "100%", display: "flex", flexDirection: "column"}}>
			<TextField
				name="name"
				label="Nombre"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.touched.name && Boolean(formik.errors.name)}
				helperText={formik.touched.name && formik.errors.name}
				sx={{ width: "30%", mb: 2 }}
            />
            <Box sx={{display: 'flex', alignItems: "center", width: '100%', mb: "1rem"}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={exercises}
                    sx={{ width: "20%", mr: 2 }}
                    renderInput={(params) =>
                        <TextField
                            {...params}

                        />
                    }
                />
                <FormControl sx={{ width: "20%", mr: 2 }}>
                    <InputLabel>Día</InputLabel>
                    <Select
                        name="day"
                        value={formik.values.day}
                        onChange={formik.handleChange}
                        input={<OutlinedInput label="Día" />}>
                        {dias.map((dia: any) => (
                            <MenuItem key={dia.number} value={dia.number}>
                                {dia.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="sets"
                    label="Sets"
                    value={formik.values.sets}
                    onChange={formik.handleChange}
                    error={formik.touched.sets && Boolean(formik.errors.sets)}
                    helperText={formik.touched.sets && formik.errors.sets}
                    type="number"
                    sx={{ width: "5%", mr: 2 }}
                    className={styles.numberInput}
                />
                <TextField
                    name="reps"
                    label="Reps"
                    value={formik.values.reps}
                    onChange={formik.handleChange}
                    error={formik.touched.reps && Boolean(formik.errors.reps)}
                    helperText={formik.touched.reps && formik.errors.reps}
                    type="number"
                    sx={{ width: "5%", mr: 2 }}
                    className={styles.numberInput}
                />
                <Button color="primary" variant="contained" type="submit" sx={{ width: "7%" }}>
                    Agregar
                </Button>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button color="primary" variant="contained" type="submit" sx={{width: "20%"}}>
                    Guardar
                </Button>
            </Box>
		</Form>
	);
}