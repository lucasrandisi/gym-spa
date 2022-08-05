import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { Exercise } from "models/exercise";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";

type EditExerciseProps = {
	exercise: Exercise;
	muscleGroups: Array<MuscleGroup>
}


const EditExercise: any = ({ exercise, muscleGroups }: EditExerciseProps) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: ExerciseForm = {
		name: exercise.name,
		muscleGroupIds: exercise.muscleGroups.map(muscleGroup => muscleGroup.id)
	};

	function onSubmit(values: ExerciseForm) {
		api.put(`/api/exercises/${exercise.id}`, values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/ejercicios"), 1000);
			});
	}

	return (
		<AuthLayout>
			<Header title="Ejercicios" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<ExerciseForm
					muscleGroups={muscleGroups}
					initialValues={initialValues}
					onSubmit={onSubmit}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Ejercicio actualizado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</AuthLayout>
	);
}


export default withAuth(EditExercise);


export async function getServerSideProps({ req, params }: { req: NextApiRequest, params: { id: string } }) {
	const [muscleGroupsResponse, exerciseResponse] = await Promise.all([
		api.get("/api/muscle-groups", {
			headers: {
				Authorization: "Bearer " + req.cookies.access_token
			}
		}),
		api.get(`/api/exercises/${params.id}`, {
			headers: {
				Authorization: "Bearer " + req.cookies.access_token
			}
		})
	]);

	return {
		props: {
			exercise: exerciseResponse.data,
			muscleGroups: muscleGroupsResponse.data
		}
	};
}