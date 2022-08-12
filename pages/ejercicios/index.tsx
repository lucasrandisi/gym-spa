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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ExerciseService from "services/exercise.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ExercisesPage: any = () => {
	const [name, setName] = React.useState("");
	const queryClient = useQueryClient();

	const exercises = useQuery(["excercises"], ExerciseService.getAll, {
		initialData: [],
	});

	const mutation = useMutation(
		["delete-exercise"],
		(id: number) => ExerciseService.delete(id),
		{
			onError: err => {
				console.error(err);
			},
			onSuccess: () => {
				queryClient.fetchQuery(["excercises"]);
			},
		}
	);

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		// const filteredExercises = exercises.data.filter(
		// 	exercise =>
		// 		exercise.name.toLocaleLowerCase().includes(searchValue) ||
		// 		exercise.muscleGroups
		// 			.map(muscleGroup => muscleGroup.name.toLowerCase())
		// 			.some(muscleGroupName => muscleGroupName.includes(searchValue))
		// );

		setName(searchValue);
	};

	return (
		<div>
			<Header title="Ejercicios" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<TextField
					label="Buscar Nombre o Músculo"
					variant="standard"
					type="search"
					value={name}
					onChange={onSearchChange}
					color="secondary"
				/>
				<Box sx={{ ml: "auto" }}>
					<Link href="ejercicios/nuevo">
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
							<TableCell>Músculos</TableCell>
							<TableCell />
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{exercises.data.map(exercise => (
							<TableRow key={exercise.id}>
								<TableCell>{exercise.id}</TableCell>
								<TableCell>{exercise.name}</TableCell>
								<TableCell>
									{exercise.muscleGroups.map(muscleGroup => muscleGroup.name).join(", ")}
								</TableCell>
								<TableCell>
									<Link href={`/ejercicios/${exercise.id}`}>
										<IconButton aria-label="edit">
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
								<TableCell>
									<IconButton
										onClick={() => mutation.mutate(exercise.id)}
										aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default ExercisesPage;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

ExercisesPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
