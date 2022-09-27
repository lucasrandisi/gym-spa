import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { RoutineForm } from "components/routines/routine-form/RoutinesForm";
import { Exercise } from "models/exercise";
import { Routine } from "models/routine";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";

type EditRoutineProps = {
    routine: Routine;
    exercises: Exercise[]
}

const EditRoutine: any = ({ routine, exercises }: EditRoutineProps) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

    function onSubmit(values: RoutineForm) {
        const body = {
            name: values.name,
            exercises: values.newRoutineExercises.map(newExerciseRoutine => {
                return {
                    exerciseId: newExerciseRoutine.exercise.id,
                    day: newExerciseRoutine.day,
                    sets: newExerciseRoutine.sets,
                    reps: newExerciseRoutine.reps
                };
            })
        }

        api.put(`/api/routines/${routine.id}`, body)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/rutinas"), 1000);
			});
	}

	return (
		<>
			<Header title="Rutinas" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<RoutineForm
                    routine={routine}
                    exercises={exercises}
					onSubmit={onSubmit}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Rutina actualizada"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
}

export async function getServerSideProps({ req, params }: { req: NextApiRequest, params: { id: string } }) {
    const [routineResponse, exercisesResponse] = await Promise.all([
        api.get(`/api/routines/${params.id}`, {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        }),
        api.get('/api/exercises', {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        })
    ]);

	return {
		props: {
            routine: routineResponse.data,
            exercises: exercisesResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		}
	};
}

export default EditRoutine;

EditRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};