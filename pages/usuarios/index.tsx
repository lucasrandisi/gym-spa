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
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Button, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "models/user";
import moment from "moment";

const UsersPage: any = ({ usersList }: { usersList: Array<User> }) => {
	const [searchValue, setSearchValue] = React.useState("");
	const [users, setUsers] = React.useState(usersList);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [snackbarText, setSnackbarText] = React.useState("");

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		const filteredUsers = usersList.filter(
			user =>
				user.name.toLocaleLowerCase().includes(searchValue) ||
				user.nroDoc.includes(searchValue)
		);

		setSearchValue(searchValue);
		setUsers(filteredUsers);
	};

	async function deleteUser(id: number) {
		await api.delete(`/api/users/${id}`);
		setSnackbarText("Miembro eliminado");
		setOpenSnackbar(true);

		api.get(`api/users`).then(({ data }) => setUsers(data));
	}

	async function updatePayment(id: number) {
		await api.post(`/api/payments/pay`, { userId: id, amount: 1000 });
		setSnackbarText("Fecha de pago actualizada");
		setOpenSnackbar(true);

		api.get(`api/users`).then(({ data }) => setUsers(data));
	}

	return (
		<>
			<Header title="Usuarios" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<TextField
					label="Nombre o Documento"
					variant="standard"
					type="search"
					value={searchValue}
					onChange={onSearchChange}
					color="secondary"
				/>
				<Box sx={{ ml: "auto" }}>
					<Link href="usuarios/nuevo">
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
							<TableCell>Documento</TableCell>
							<TableCell>Fecha de Pago</TableCell>
							<TableCell>Tipo</TableCell>
							<TableCell />
							<TableCell />
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.nroDoc}</TableCell>
								<TableCell>{moment(user.payment).format("DD/MM/YYYY")}</TableCell>
								<TableCell>{user.roles[0].name}</TableCell>
								<TableCell>
									<Link href={`/usuarios/${user.id}`}>
										<IconButton aria-label="edit">
											<EditIcon />
										</IconButton>
									</Link>
								</TableCell>
								<TableCell>
									<IconButton onClick={() => deleteUser(user.id)} aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="secondary"
										onClick={() => updatePayment(user.id)}>
										Registrar Pago
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Snackbar
				open={openSnackbar}
				message={snackbarText}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const usersResponse = await api.get("/api/users", {
		headers: {
			Authorization: "Bearer " + req.cookies.access_token,
		},
	});

	return {
		props: {
			usersList: usersResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default UsersPage;

UsersPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
