import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Box,
} from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { Routine } from "models/routine";
import { NextApiRequest } from "next";
import React, { ReactElement } from "react";
import { api } from "services/api";

const MiRutinaPage = ({ routine }: { routine: Routine }) => (
	<>
		<Header title="Mi Rutina" />
		<Box sx={{ paddingLeft: "1rem" }}>
			<h2>{routine.name}</h2>
		</Box>
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Día</TableCell>
						<TableCell>Nombre</TableCell>
						<TableCell>Sets</TableCell>
						<TableCell>Reps</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{routine.routineExercises.map(routineExercise => (
						<TableRow key={routineExercise.id}>
							<TableCell>{routineExercise.day}</TableCell>
							<TableCell>{routineExercise.exercise.name}</TableCell>
							<TableCell>{routineExercise.sets}</TableCell>
							<TableCell>{routineExercise.reps}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</>
);

export async function getServerSideProps({
	req,
	params,
}: {
	req: NextApiRequest;
	params: any;
}) {
	const [res] = await Promise.all([
		api.get(`/api/routines/${params.id}`, {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
	]);

	return {
		props: {
			routine: res.data,
			isProtected: true,
			userTypes: ["Admin", "User"],
		},
	};
}

MiRutinaPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default MiRutinaPage;
