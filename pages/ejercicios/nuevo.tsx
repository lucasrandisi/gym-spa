import { Box, Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import ExerciseService from "services/exercise.service";

const NewExercise: any = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const muscleGroups = useQuery(["muscles-groups"], ExerciseService.getAllMuscles, {
		initialData: [],
		// cacheTime: 2000,
	});

	const initialValues: ExerciseFormType = {
		name: "",
		muscleGroupIds: [],
	};

	const mutation = useMutation(
		["create-exercise"],
		(values: ExerciseFormType) => ExerciseService.create(values),
		{
			onError: () => {
				setOpenSnackbar(true);
			},
			onSuccess: async data => {
				queryClient.setQueryData(["excercises"], (old: any) => [...old, data]);
				setOpenSnackbar(true);
			},
			onSettled: () => router.push("/ejercicios"),
		}
	);

	return (
		<div>
			<Header title="Ejercicios" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<ExerciseForm
					muscleGroups={muscleGroups.data}
					initialValues={initialValues}
					onSubmit={mutation.mutate}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Ejercicio registrado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</div>
	);
};

export default NewExercise;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

NewExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
