import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";

import UserService from "services/user.service";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import withAuth from "security/withAuth";

const UsersPage: any = () => {
	const {
		isLoading,
		error,
		data: miembros,
	} = useQuery(["users"], async () => UserService.getAll());

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
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
						{miembros !== undefined
							? miembros.map(miembro => (
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
							  ))
							: ""}
					</TableBody>
				</Table>
			</TableContainer>
		</AuthLayout>
	);
};

export default withAuth(UsersPage);
