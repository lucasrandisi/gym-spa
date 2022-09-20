import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Exercise } from "models/exercise";
import React, { useState } from "react";
import { RoutineExercise, RoutineExercisesTable } from "../routine-exercises-table/RoutineExercisesTable";
import styles from './routine-form.module.scss';
import * as yup from 'yup';

const Form = styled('form')({
	width: "30%",
});

const validationSchema = yup.object({
    name: yup.string().required(),
    exercise: yup.object().required(),
    day: yup.number().required(),
    sets: yup.number().required(),
    reps: yup.number().required(),
})

export type RoutineForm = {
    name: string,
    newRoutineExercises: RoutineExercise[]
}

type RoutineFormProps = {
    exercises: Array<Exercise>
    onSubmit: any;
    routineExercises: {
        id: number;
        exercise: Exercise;
        day: number;
        sets: number;
        reps: number;
    }[],
}

const dias = [1, 2, 3, 4, 5, 6, 7];

export function RoutineForm({ exercises, onSubmit, routineExercises }: RoutineFormProps) {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [newRoutineExercises, setNewRoutneExercises] = useState(routineExercises.map(routineExercise => {
        return {
            key: new Date().getTime(),
            exercise: routineExercise.exercise,
            day: routineExercise.day,
            sets: routineExercise.sets,
            reps: routineExercise.reps,
        }
    }));

    const formik = useFormik({
        initialValues: {
            name: "",
            day: "",
            sets: "",
            reps: "",
        },
        onSubmit: onSubmit,
        validationSchema: validationSchema

    });


    function addExercise() {
        setNewRoutneExercises([
            ...newRoutineExercises,
            {
                key: new Date().getTime(),
                exercise: selectedExercise!,
                day: Number(formik.values.day),
                sets: Number(formik.values.sets),
                reps: Number(formik.values.reps),
            }
        ].sort((a, b) => {
            if (a.day < b.day) {
                return -1;
            } else if (a.day > b.day) {
                return 1;
            } else {
                return a.key > b.key ? 1 : -1;
            }
        }))
    }

    function removeRoutineExercise(key: number) {
        setNewRoutneExercises(newRoutineExercises.filter(newRoutineExercise => newRoutineExercise.key != key));
    }

    return (
        <Box sx={{width: "80%"}}>
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
                <Box sx={{ display: 'flex', alignItems: "center", width: '100%', mb: "1rem"}}>
                    <Autocomplete
                        options={exercises}
                        getOptionLabel={(exercise) => exercise.name}
                        autoSelect
                        autoHighlight
                        sx={{ width: "25%", mr: 2 }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Ejercicio"
                                type="outlined"
                            />
                        }
                    />
                    <FormControl sx={{ width: "7%", mr: 2 }}>
                        <InputLabel>Día</InputLabel>
                        <Select
                            name="day"
                            value={formik.values.day}
                            onChange={formik.handleChange}
                            error={formik.touched.sets && Boolean(formik.errors.sets)}
                            input={<OutlinedInput label="Día" />}>
                            {dias.map((dia: any) => (
                                <MenuItem key={dia} value={dia}>
                                    {dia}
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
                        type="number"
                        sx={{ width: "7%", mr: 2 }}
                        className={styles.numberInput}
                    />
                    <TextField
                        name="reps"
                        label="Reps"
                        value={formik.values.reps}
                        onChange={formik.handleChange}
                        error={formik.touched.reps && Boolean(formik.errors.reps)}
                        type="number"
                        sx={{ width: "7%", mr: 2 }}
                        className={styles.numberInput}
                    />
                    <Button
                        color="primary"
                        size="medium"
                        variant="contained"
                        type="submit"
                        sx={{ width: "10%", height: "100%" }}
                    >
                        Agregar
                    </Button>
                </Box>
            </Form>

            <RoutineExercisesTable
                routineExercises={newRoutineExercises}
                removeRoutineExercise={removeRoutineExercise}
            />

            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button
                    onClick={() => onSubmit({
                        name: formik.values.name,
                        newRoutineExercises: newRoutineExercises
                    })}
                    color="primary" variant="contained" sx={{ width: "20%" }}>
                    Guardar
                </Button>
            </Box>
        </Box>
	);
}