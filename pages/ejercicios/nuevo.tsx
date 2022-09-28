import { Box, Snackbar } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";
import ExerciseService from "services/exercise.service";



const NewExercise: any = ({muscleGroups}: {muscleGroups: MuscleGroup[]}) => {
	const router = useRouter();
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const initialValues: ExerciseFormType = {
		name: "",
		muscleGroupIds: [],
	};

    function onSubmit(values: ExerciseFormType) {
        api.post("/api/exercises", values)
            .then(() => {
                setOpenSnackbar(true);

                setTimeout(() => router.push("/ejercicios"), 2000);
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
			<Snackbar
				open={openSnackbar}
				message="Ejercicio registrado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</div>
	);
};

export default NewExercise;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    const muscleGroupsResponse = await api.get('/api/muscle-groups', {
        headers: {
            Authorization: "Bearer " + req.cookies.access_token
        }
    });

    return {
        props: {
            muscleGroups: muscleGroupsResponse.data,
            isProtected: true,
            userTypes: ["Admin"],
        }
    };
}

NewExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
