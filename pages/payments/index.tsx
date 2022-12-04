import React, { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { useAuth } from "security/auth.context";
import PaymentService from "services/payment.service";
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
} from "@mui/material";
import moment from "moment";
import Header from "components/header/header";

const PaymentsPage: any = () => {
	const { user } = useAuth();

	const { isLoading, error, data, isFetched } = useQuery(
		["my-payments"],
		() => PaymentService.findAllByUser(user!.id),
		{
			initialData: [],
		}
	);

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<div>
			<Header title="Mis pagos" />

			{data.length > 0 && (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Fecha de Pago</TableCell>
								<TableCell>Vigencia</TableCell>
								<TableCell>Monto $</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data!.map(p => (
								<TableRow key={p.id}>
									<TableCell>{moment(p.paymentDate).format("DD/MM/YYYY")}</TableCell>
									<TableCell>{moment(p.expirationDate).format("DD/MM/YYYY")}</TableCell>
									<TableCell>${p.amount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{isFetched && data.length === 0 && (
				<Alert severity="info">
					<AlertTitle>No tienes pagos realizados</AlertTitle>
					Aca apareceran los pagos que realices
				</Alert>
			)}
		</div>
	);
};

export default PaymentsPage;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
