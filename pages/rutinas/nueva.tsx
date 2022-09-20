import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { RoutineForm } from "components/routines/routine-form/RoutinesForm";
import { Exercise } from "models/exercise";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";


const NewRoutine: any = ({exercises} : {exercises: Array<Exercise>}) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

    function onSubmit(values: RoutineForm) {
        console.log("Create Routine", values);
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
                    exercises={exercises}
                    routineExercises={[]}
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
    const exercisesResponse = await api.get('/api/exercises', {
        headers: {
            Authorization: "Bearer " + req.cookies.access_token
        }
    });

    return {
        props: {
            exercises: exercisesResponse.data,
			isProtected: true,
			userTypes: ["admin"],
		}
	};
}


export default NewRoutine;

NewRoutine.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};