import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import ExerciseService from "services/exercise.service";

const NewMember: any = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

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
				enqueueSnackbar("Ocurrió un error.", { variant: "error" });
			},
			onSuccess: async data => {
				queryClient.setQueryData(["excercises"], (old: any) => [...old, data]);
				enqueueSnackbar("Ejercicio creado correctamente", { variant: "success" });
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
		</div>
	);
};

export default NewMember;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

NewMember.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
