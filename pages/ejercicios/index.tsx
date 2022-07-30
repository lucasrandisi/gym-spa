import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { NextApiRequest } from "next/types";
import React from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Exercise } from 'models/exercise';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';


const ExercisesPage: any = ({ exercisesList }: { exercisesList: Array<Exercise> }) => {
	const [name, setName] = React.useState('');
	const [exercises, setExercises] = React.useState(exercisesList);

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		const filteredExercises = exercisesList.filter(exercise =>
			exercise.name.toLocaleLowerCase().includes(searchValue)
		);

		setName(searchValue);
		setExercises(filteredExercises);
	};

	return (
		<AuthLayout>
			<Header title="Ejercicios" />
			<Box sx={{ mb: 4, pl: 2 }}>
				<TextField
					label="Buscar Nombre"
					variant="standard"
					type="search"
					value={name}
					onChange={onSearchChange}
					color="secondary"
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Nombre</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{exercises.map((exercise) => (
							<TableRow key={exercise.id}>
								<TableCell>{exercise.id}</TableCell>
								<TableCell>{exercise.name}</TableCell>
								<TableCell>
									<Link href={`/ejercicios/${exercise.id}`}>
										<IconButton aria-label="edit">
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</AuthLayout>
	);

}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const response = await api.get('/api/exercises', {
		headers: {
			Authorization: 'Bearer ' + req.cookies.access_token
		}
	});

	return {
		props: {
			exercisesList: response.data
		}
	};
}

export default withAuth(ExercisesPage);