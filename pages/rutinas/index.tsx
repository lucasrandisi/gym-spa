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
import React, { ReactElement } from "react";
import { api } from "services/api";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Routine } from 'models/routine';


const RoutinesPage: any = ({ routinesList }: { routinesList: Array<Routine> }) => {
	const [name, setName] = React.useState('');
	const [routines, setRoutines] = React.useState(routinesList);
	const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		const filteredRoutines = routinesList.filter(routine =>
			routine.name.toLocaleLowerCase().includes(searchValue));

		setName(searchValue);
		setRoutines(filteredRoutines);
	};

	async function deleteRoutine(id: number) {
		await api.delete(`/api/routines/${id}`);
		setOpenDeleteSnackbar(true);

		api.get(`api/routines`).then(({ data }) => setRoutines(data));
	}

	return (
		<>
			<Header title="Rutinas" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<TextField
					label="Buscar Rutina"
					variant="standard"
					type="search"
					value={name}
					onChange={onSearchChange}
					color="secondary"
				/>
				<Box sx={{ ml: "auto" }}>
					<Link href="rutinas/nueva">
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
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{routines.map((routine) => (
							<TableRow key={routine.id}>
								<TableCell>{routine.id}</TableCell>
								<TableCell>{routine.name}</TableCell>
								<TableCell>
									<Link href={`/rutinas/${routine.id}`}>
										<IconButton aria-label="edit">
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
								<TableCell>
									<IconButton onClick={() => deleteRoutine(routine.id)} aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Snackbar
				open={openDeleteSnackbar}
				message="Rutina eliminada"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);

}


export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const response = await api.get('/api/routines', {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token
		}
	});

	return {
		props: {
			routinesList: response.data,
			isProtected: true,
			userTypes: ["admin"],
		}
	};
}

export default RoutinesPage;

RoutinesPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};