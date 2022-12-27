import { Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { api } from "services/api";

const initialValues: ExerciseFormType = {
	name: "",
	muscleGroupIds: [],
};

const NewExercise: any = ({ muscleGroups }: { muscleGroups: MuscleGroup[] }) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	function onSubmit(values: ExerciseFormType) {
		api.post("/api/exercises", values).then(() => {
			enqueueSnackbar("Ejercicio registrado", { variant: "success" });
			router.push("/ejercicios");
		});
	}

	return (
		<div>
			<Header title="Ejercicios" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<ExerciseForm
					muscleGroups={muscleGroups}
					initialValues={initialValues}
					onSubmit={onSubmit}
				/>
			</Box>
		</div>
	);
};

export default NewExercise;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const muscleGroupsResponse = await api.get("/api/muscle-groups", {
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});

	return {
		props: {
			muscleGroups: muscleGroupsResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

NewExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
