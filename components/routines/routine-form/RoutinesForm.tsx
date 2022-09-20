import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Exercise } from "models/exercise";
import React, { useState } from "react";
import { RoutineExercise, RoutineExercisesTable } from "../routine-exercises-table/RoutineExercisesTable";
import styles from './routine-form.module.scss';
import * as yup from 'yup';

const Form = styled('form')({});

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
    const [newRoutineExercises, setNewRoutineExercises] = useState(routineExercises.map(routineExercise => {
        return {
            key: new Date().getTime(),
            exercise: routineExercise.exercise,
            day: routineExercise.day,
            sets: routineExercise.sets,
            reps: routineExercise.reps,
        }
    }));

    const routineFormik = useFormik({
        initialValues: {
            name: undefined,
        },
        validationSchema: yup.object({
            name: yup.string().required(),
        }),
        onSubmit: onSubmit
    });

    const routineExerciseFormik = useFormik({
        initialValues: {
            exercise: null,
            day: '',
            sets: '',
            reps: ''
        },
        validationSchema: yup.object({
            exercise: yup.object().required(),
            day: yup.number().required(),
            sets: yup.number().required(),
            reps: yup.number().required()
        }),
        onSubmit: () => {}
    })


    async function addExercise() {
        const errors = await routineExerciseFormik.validateForm();

        if (Object.keys(errors).length !== 0) {
            return;
        }

        setNewRoutineExercises([
            ...newRoutineExercises,
            {
                key: new Date().getTime(),
                exercise: routineExerciseFormik.values.exercise!,
                day: Number(routineExerciseFormik.values.day),
                sets: Number(routineExerciseFormik.values.sets),
                reps: Number(routineExerciseFormik.values.reps),
            }
        ].sort((a, b) => {
            if (a.day < b.day) {
                return -1;
            } else if (a.day > b.day) {
                return 1;
            } else {
                return a.key > b.key ? 1 : -1;
            }
        }));
    }
    
    function removeRoutineExercise(key: number) {
        setNewRoutineExercises(newRoutineExercises.filter(newRoutineExercise => newRoutineExercise.key != key));
    }
    
    return (
        <Form
            onSubmit={routineFormik.handleSubmit}
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <TextField
                name="name"
                label="Nombre"
                value={routineFormik.values.name}
                onChange={routineFormik.handleChange}
                error={Boolean(routineFormik.errors.name)}
                sx={{ width: "25%", mb: 6 }}
            />

            <Box sx={{ display: 'flex', alignItems: "center", width: '100%', mb: 3 }}>
                <Autocomplete
                    options={exercises}
                    getOptionLabel={(exercise) => exercise.name}
                    onChange={(_, value) => routineExerciseFormik.setFieldValue("exercise", value)}
                    autoSelect
                    autoHighlight
                    sx={{ width: "25%", mr: 2 }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            error={Boolean(routineExerciseFormik.errors.exercise)}
                            label="Ejercicio"
                            type="outlined"
                        />
                    }
                />
                <FormControl sx={{ width: "7%", mr: 2 }}>
                    <InputLabel>Día</InputLabel>
                    <Select
                        name="day"
                        value={routineExerciseFormik.values.day}
                        onChange={routineExerciseFormik.handleChange}
                        error={Boolean(routineExerciseFormik.errors.day)}
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
                    value={routineExerciseFormik.values.sets}
                    onChange={routineExerciseFormik.handleChange}
                    error={Boolean(routineExerciseFormik.errors.sets)}
                    type="number"
                    sx={{ width: "7%", mr: 2 }}
                    className={styles.numberInput}
                />
                <TextField
                    name="reps"
                    label="Reps"
                    value={routineExerciseFormik.values.reps}
                    onChange={routineExerciseFormik.handleChange}
                    error={Boolean(routineExerciseFormik.errors.reps)}
                    type="number"
                    sx={{ width: "7%", mr: 2 }}
                    className={styles.numberInput}
                />
                <Button
                    color="primary"
                    size="medium"
                    variant="contained"
                    onClick={() => addExercise()}
                    sx={{ width: "10%", height: "100%" }}>
                    Agregar
                </Button>
            </Box>

            <RoutineExercisesTable
                routineExercises={newRoutineExercises}
                removeRoutineExercise={removeRoutineExercise}
                />

            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Button
                    type="submit"
                    color="primary" variant="contained" sx={{ width: "20%" }}>
                    Guardar
                </Button>
            </Box>
        </Form>
    );
}