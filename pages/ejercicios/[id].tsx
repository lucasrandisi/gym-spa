import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { ExerciseForm, ExerciseFormType } from "components/exercise/ExerciseForm";
import Header from "components/header/header";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import ExerciseService from "services/exercise.service";
import { Exercise } from "models/exercise";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { api } from "services/api";

const EditExercise: any = ({ exercise, muscleGroups }: { exercise: Exercise, muscleGroups: MuscleGroup[] }) => {
    const router = useRouter()
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const initialValues: ExerciseFormType = {
        name: exercise.name,
        muscleGroupIds: exercise.muscleGroups.map(g => g.id),
    };


    function onSubmit(values: ExerciseFormType) {
        api.put(`/api/exercises/${exercise.id}`, values)
            .then(() => {
                setOpenSnackbar(true);

                setTimeout(() => router.push("/ejercicios"), 2000);
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
			<Snackbar
				open={openSnackbar}
				message="Ejercicio actualizado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
};

export default EditExercise;


export async function getServerSideProps({ req, params }: { req: NextApiRequest, params: { id: string } }) {
    const [exerciseResponse, muscleGroupsResponse] = await Promise.all([
        api.get(`/api/exercises/${params.id}`, {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        }),
        api.get('/api/muscle-groups', {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        })
    ]);
    console.log(exerciseResponse);

    return {
        props: {
            exercise: exerciseResponse.data,
            muscleGroups: muscleGroupsResponse.data,
            isProtected: true,
            userTypes: ["Admin"],
        }
    };
}

EditExercise.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
