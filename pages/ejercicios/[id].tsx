import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import ExerciseService from "services/exercise.service";

const EditExercise: any = () => {
	const router = useRouter();
	const { id } = router.query;
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const exercise = useQuery(["excercise"], () => ExerciseService.get(id as string));

	const muscleGroups = useQuery(["muscles-groups"], ExerciseService.getAllMuscles, {
		initialData: [],
	});

	const mutation = useMutation(
		["edit-exercise"],
		(values: ExerciseFormType) => ExerciseService.edit(id as string, values),
		{
			onError: () => {
				setOpenSnackbar(true);
				setTimeout(() => router.push("/ejercicios"), 2000);
			},
			onSuccess: () => {
				setOpenSnackbar(true);
				setTimeout(() => router.push("/ejercicios"), 2000);
			},
		}
	);

	if (!exercise.data) {
		return <div>Loading...</div>;
	}

	const initialValues: ExerciseFormType = {
		name: exercise.data.name,
		muscleGroupIds: exercise.data.muscleGroups.map(g => g.id),
	};

	return (
		<div>
			<Header title="Ejercicios" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				{exercise.data && (
					<ExerciseForm
						muscleGroups={muscleGroups.data}
						initialValues={initialValues}
						onSubmit={mutation.mutate}
					/>
				)}
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Ejercicio actualizado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</div>
	);
};

export default EditExercise;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	};
}

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

EditExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
