import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import React from "react";
import withAuth from "security/withAuth";
import UserService, { User } from "services/user.service";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Link from "next/link";

type Props = {
	miembros: Array<User>;
};

const Miembros = ({ miembros }: Props) => (
	<AuthLayout>
		<Header title="Miembros" />
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Dni</TableCell>
						<TableCell>Nombre</TableCell>
						<TableCell>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{miembros.map(miembro => (
						<TableRow key={miembro.id}>
							<TableCell>{miembro.id}</TableCell>
							<TableCell>{miembro.nroDoc}</TableCell>
							<TableCell>{miembro.name}</TableCell>
							<TableCell>{miembro.email}</TableCell>
							<TableCell>
								<Link href={`/miembros/${miembro.id}/rutina`} passHref>
									<Button variant="contained">Rutina</Button>
								</Link>
							</TableCell>
							<TableCell>
								<Link href={`/miembros/${miembro.id}/editar`} passHref>
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

export async function getServerSideProps() {
	const users = await UserService.getAll();

	return {
		props: {
			miembros: users,
		},
	};
}

export default withAuth(Miembros);
