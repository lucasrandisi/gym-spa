import { Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import {
	RoutineForm,
	RoutineFormType,
} from "components/routines/routine-form/RoutinesForm";
import { Exercise } from "models/exercise";
import { Routine } from "models/routine";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { api } from "services/api";

type EditRoutineProps = {
	routine: Routine;
	exercises: Exercise[];
};

const EditRoutine: any = ({ routine, exercises }: EditRoutineProps) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	function handleSubmit(values: RoutineFormType): void {
		const body = {
			userId: values.user.id,
			name: values.name,
			from: values.from,
			to: values.to,
			exercises: values.exercises.map(newExerciseRoutine => ({
				exerciseId: newExerciseRoutine.id,
				day: newExerciseRoutine.day,
				sets: newExerciseRoutine.sets,
				reps: newExerciseRoutine.reps,
			})),
		};
		api.put(`/api/routines/${routine.id}`, body).then(() => {
			enqueueSnackbar("Rutina actualizada", { variant: "success" });
			router.push("/rutinas");
		});
	}

	return (
		<>
			<Header title="Rutinas" />
			<Box sx={{ display: "flex", justifyContent: "center", ml: "1rem" }}>
				<RoutineForm
					routine={routine}
					exercises={exercises}
					onSubmit={(values: RoutineFormType) => handleSubmit(values)}
				/>
			</Box>
		</>
	);
};

export async function getServerSideProps({
	req,
	params,
}: {
	req: NextApiRequest;
	params: { id: string };
}) {
	const [routineResponse, exercisesResponse] = await Promise.all([
		api.get(`/api/routines/${params.id}`, {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
		api.get("/api/exercises", {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
	]);

	return {
		props: {
			routine: routineResponse.data,
			exercises: exercisesResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default EditRoutine;

EditRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
