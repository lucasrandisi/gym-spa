import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { RoutineForm, RoutineFormType } from "components/routines/RoutinesForm";
import { Routine } from "models/routine";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";

type EditRoutineProps = {
	routine: Routine;
}

const EditRoutine: any = ({ routine }: EditRoutineProps) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: RoutineFormType = {
		name: routine.name,
		routineExercises: routine.routineExercises.map(routineExercise => {
			return {
				exerciseId: routineExercise.exercise.id,
				day: routineExercise.day,
				sets: routineExercise.sets,
				reps: routineExercise.reps
			}
		})
	};

	function onSubmit(values: RoutineFormType) {
		api.put(`/api/routines/${routine.id}`, values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/rutinas"), 1000);
			});
	}

	return (
		<>
			<Header title="Rtuinas" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<RoutineForm
					initialValues={initialValues}
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
	const routineResponse = await api.get(`/api/routines/${params.id}`, {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token
		}
	});

	return {
		props: {
			routine: routineResponse.data,
			isProtected: true,
			userTypes: ["admin"],
		}
	};
}

export default EditRoutine;

EditRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};