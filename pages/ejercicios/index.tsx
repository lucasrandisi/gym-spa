import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { NextApiRequest } from "next/types";
import React, { ReactElement } from "react";
import { api } from "services/api";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { Exercise } from "models/exercise";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ExercisesPage: any = ({ exercisesList }: { exercisesList: Array<Exercise> }) => {
	const [name, setName] = React.useState("");
	const [exercises, setExercises] = React.useState(exercisesList);

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		const filteredExercises = exercisesList.filter(
			exercise =>
				exercise.name.toLocaleLowerCase().includes(searchValue) ||
				exercise.muscleGroups
					.map(muscleGroup => muscleGroup.name.toLowerCase())
					.some(muscleGroupName => muscleGroupName.includes(searchValue))
		);

		setName(searchValue);
		setExercises(filteredExercises);
	};

	async function deleteExercise(id: number) {
		await api.delete(`/api/exercises/${id}`);

		api.get(`api/exercises`).then(({ data }) => setExercises(data));
	}

	return (
		<AuthLayout>
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
						{exercises.map(exercise => (
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
										onClick={() => deleteExercise(exercise.id)}
										aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</AuthLayout>
	);
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const response = await api.get("/api/exercises", {
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});

	return {
		props: {
			exercisesList: response.data,
		},
	};
}

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
