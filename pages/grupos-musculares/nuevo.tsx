import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { MuscleGroupForm } from "components/muscle-groups/MuscleGroupForm";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";


const NewMuscleGroup: any = () => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: MuscleGroupForm = {
		name: "",
	};

	function onSubmit(values: MuscleGroupForm) {
		api.post("/api/muscle-groups", values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/grupos-musculares"), 2000);

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
				message="Grupo Muscular registrado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</AuthLayout>
	);
}


export default withAuth(NewMuscleGroup);


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