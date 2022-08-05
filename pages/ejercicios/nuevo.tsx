import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";


const NewExercise: any = ({ muscleGroups }: { muscleGroups: Array<MuscleGroup> }) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: ExerciseForm = {
		name: "",
		muscleGroupIds: []
	};

	function onSubmit(values: ExerciseForm) {
		api.post("/api/exercises", values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/ejercicios"), 2000);

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
				message="Ejercicio registrado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</AuthLayout>
	);
}


export default withAuth(NewExercise);


export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const response = await api.get("/api/muscle-groups", {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token
		}
	});

	return {
		props: {
			muscleGroups: response.data
		}
	};
}