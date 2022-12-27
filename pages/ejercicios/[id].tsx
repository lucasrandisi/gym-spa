import Box from "@mui/material/Box";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Exercise } from "models/exercise";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { api } from "services/api";
import { useSnackbar } from "notistack";

const EditExercise: any = ({
	exercise,
	muscleGroups,
}: {
	exercise: Exercise;
	muscleGroups: MuscleGroup[];
}) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const initialValues: ExerciseFormType = {
		name: exercise.name,
		muscleGroupIds: exercise.muscleGroups.map(g => g.id),
	};

	function onSubmit(values: ExerciseFormType) {
		api.put(`/api/exercises/${exercise.id}`, values).then(() => {
			enqueueSnackbar("Ejercicio actualizado", { variant: "success" });
			router.push("/ejercicios");
		});
	}

	return (
		<>
			<Header title="Ejercicios" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<ExerciseForm
					muscleGroups={muscleGroups}
					initialValues={initialValues}
					onSubmit={onSubmit}
				/>
			</Box>
		</>
	);
};

export default EditExercise;

export async function getServerSideProps({
	req,
	params,
}: {
	req: NextApiRequest;
	params: { id: string };
}) {
	const [exerciseResponse, muscleGroupsResponse] = await Promise.all([
		api.get(`/api/exercises/${params.id}`, {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
		api.get("/api/muscle-groups", {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
	]);

	return {
		props: {
			exercise: exerciseResponse.data,
			muscleGroups: muscleGroupsResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

EditExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
