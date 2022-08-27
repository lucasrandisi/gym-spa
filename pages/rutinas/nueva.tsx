import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { RoutineForm, RoutineFormType } from "components/routines/RoutinesForm";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";


const NewRoutine: any = () => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: RoutineFormType = {
		name: "",
		routineExercises: []
	};

	function onSubmit(values: RoutineFormType) {
		api.post("/api/routines", values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/rutinas"), 2000);

			});
	}

	return (
		<>
			<Header title="Rutinas" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<RoutineForm
					initialValues={initialValues}
					onSubmit={onSubmit}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Rutina registrada"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
}


export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		}
	};
}


export default NewRoutine;

NewRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};