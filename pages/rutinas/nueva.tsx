import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import {
	RoutineForm,
	RoutineFormType,
} from "components/routines/routine-form/RoutinesForm";
import { Exercise } from "models/exercise";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";

const NewRoutine: any = ({ exercises }: { exercises: Array<Exercise> }) => {
	const router = useRouter();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const onSubmit = (values: RoutineFormType): void => {
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

		api.post("/api/routines", body).then(() => {
			setOpenSnackbar(true);
			setTimeout(() => router.push("/rutinas"), 2000);
		});
	};

	return (
		<>
			<Header title="Rutinas" />
			<Box sx={{ display: "flex", justifyContent: "center", ml: "1rem" }}>
				<RoutineForm exercises={exercises} onSubmit={onSubmit} />
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Rutina registrada"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const exercisesResponse = await api.get("/api/exercises", {
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});

	return {
		props: {
			exercises: exercisesResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default NewRoutine;

NewRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
