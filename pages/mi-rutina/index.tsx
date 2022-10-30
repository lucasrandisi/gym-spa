import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Alert,
	AlertTitle,
	Pagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import moment from "moment";
import React, { ReactElement } from "react";
import { useAuth } from "security/auth.context";
import RoutineService from "services/routine.service";

const MiRutinaPage = () => {
	const { user } = useAuth();
	const [page, setPage] = React.useState(0);

	const { isLoading, error, data } = useQuery(
		["my-routines", { page }],
		() => RoutineService.findAllAssigned(user!.id, page, 4),
		{
			keepPreviousData: true,
			initialData: null,
		}
	);

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<>
			<Header title="Mis Rutinas" />

			{data && !data.empty && (
				<>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Nombre</TableCell>
									<TableCell>Inicio</TableCell>
									<TableCell>Vencimiento</TableCell>
									<TableCell>Responsable</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.content.map(routine => (
									<TableRow key={routine.id}>
										<TableCell>{routine.name}</TableCell>
										<TableCell>
											{routine.from && moment(routine.from).format("DD/MM/YYYY")}
										</TableCell>
										<TableCell>
											{routine.to && moment(routine.to).format("DD/MM/YYYY")}
										</TableCell>
										<TableCell>{routine.creator}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<Pagination
						count={data.totalPages}
						page={page + 1}
						onChange={(_, value) => setPage(value - 1)}
						size="large"
					/>
				</>
			)}

			{data && data.empty && (
				<Alert severity="info">
					<AlertTitle>No tienes rutinas asignadas</AlertTitle>
					Ponte en contacto con algun miembro de nuestro staff
				</Alert>
			)}
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["User"],
		},
	};
}

MiRutinaPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};

export default MiRutinaPage;
