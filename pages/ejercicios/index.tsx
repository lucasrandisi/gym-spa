import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import React, { ReactElement } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ExerciseTableActions from "components/exercise/Actions";
import { useQuery } from "@tanstack/react-query";
import ExerciseService from "services/exercise.service";

const ExercisesPage: any = () => {
	const [name, setName] = React.useState("");

	const { data } = useQuery(["excercises"], ExerciseService.getAll, {
		initialData: [],
		select: exercises => exercises.filter(e => e.name.toLocaleLowerCase().includes(name)),
	});

	return (
		<>
			<Header title="Ejercicios" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<TextField
					label="Buscar Ejercicio"
					variant="standard"
					type="search"
					value={name}
					onChange={e => setName(e.target.value)}
					color="secondary"
				/>
				<Box sx={{ ml: "auto" }}>
					<Link href="ejercicios/nuevo" passHref>
						<Button variant="contained">Agregar</Button>
					</Link>
				</Box>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(exercise => (
							<TableRow key={exercise.id}>
								<TableCell>{exercise.id}</TableCell>
								<TableCell>{exercise.name}</TableCell>
								<TableCell>
									<ExerciseTableActions exercise={exercise} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default ExercisesPage;

ExercisesPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
