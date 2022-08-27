import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { MuscleGroupForm } from "components/muscle-groups/MuscleGroupForm";
import { Exercise } from "models/exercise";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";

type EditMuscleGroupProps = {
	muscleGroup: MuscleGroup;
}

const EditMuscleGroup: any = ({ muscleGroup }: EditMuscleGroupProps) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: MuscleGroupForm = {
		name: muscleGroup.name,
	};

	function onSubmit(values: MuscleGroupForm) {
		api.put(`/api/muscle-groups/${muscleGroup.id}`, values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/grupos-musculares"), 1000);
			});
	}

	return (
		<AuthLayout>
			<Header title="Grupos Musculares" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<MuscleGroupForm
					initialValues={initialValues}
					onSubmit={onSubmit}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Grupo Muscular actualizado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</AuthLayout>
	);
}


export default withAuth(EditMuscleGroup);


export async function getServerSideProps({ req, params }: { req: NextApiRequest, params: { id: string } }) {
	console.log(params.id);
	const muscleGroupResponse = await api.get(`/api/muscle-groups/${params.id}`, {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token
		}
	});

	console.log(muscleGroupResponse.data);
	return {
		props: {
			muscleGroup: muscleGroupResponse.data
		}
	};
}