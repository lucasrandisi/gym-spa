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
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Button, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuscleGroup } from 'models/muscle-group';


const MuscleGroupsPage: any = ({ muscleGroupsList }: { muscleGroupsList: Array<MuscleGroup> }) => {
	const [name, setName] = React.useState('');
	const [muscleGroups, setMuscleGroups] = React.useState(muscleGroupsList);
	const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		const filteredmuscleGroups = muscleGroupsList.filter(muscleGroup =>
			muscleGroup.name.toLocaleLowerCase().includes(searchValue));

		setName(searchValue);
		setMuscleGroups(filteredmuscleGroups);
	};

	async function deletemuscleGroup(id: number) {
		await api.delete(`/api/muscle-groups/${id}`);
		setOpenDeleteSnackbar(true);

		api.get(`api/muscle-groups`).then(({ data }) => setMuscleGroups(data));
	}

	return (
		<AuthLayout>
			<Header title="Grupos Musculares" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<TextField
					label="Buscar Grupo Muscular"
					variant="standard"
					type="search"
					value={name}
					onChange={onSearchChange}
					color="secondary"
				/>
				<Box sx={{ ml: "auto" }}>
					<Link href="grupos-musculares/nuevo">
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
						{muscleGroups.map((muscleGroup) => (
							<TableRow key={muscleGroup.id}>
								<TableCell>{muscleGroup.id}</TableCell>
								<TableCell>{muscleGroup.name}</TableCell>
								<TableCell>
									<Link href={`/grupos-musculares/${muscleGroup.id}`}>
										<IconButton aria-label="edit">
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
								<TableCell>
									<IconButton onClick={() => deletemuscleGroup(muscleGroup.id)} aria-label="delete">
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
				message="Grupo Muscular eliminado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</AuthLayout >
	);

}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const response = await api.get('/api/muscle-groups', {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token
		}
	});

	return {
		props: {
			muscleGroupsList: response.data
		}
	};
}

export default withAuth(MuscleGroupsPage);