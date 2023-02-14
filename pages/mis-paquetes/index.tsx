import React, { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { Chip, Paper } from "@mui/material";
import PackagesService from "services/packages.service";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
	{ field: "packageName", headerName: "Paquete", width: 300 },
	{
		field: "startDate",
		headerName: "Valido desde",
		flex: 5,
		type: "date",
		valueFormatter: ({ value }) => value && new Date(value).toLocaleDateString(),
	},
	{
		field: "endDate",
		headerName: "Valido hasta",
		flex: 5,
		type: "date",
		valueFormatter: ({ value }) => value && new Date(value).toLocaleDateString(),
	},
	{
		field: "status",
		headerName: "Estado",
		flex: 5,
		renderCell: ({ value }) => {
			switch (value) {
				case "active":
					return <Chip label="Activo" color="success" />;
				case "expired":
					return <Chip label="Expirado" color="error" />;
				case "inactive":
				default:
					return <Chip label="Inactivo" color="warning" />;
			}
		},
	},
	{
		field: "daysLeft",
		headerName: "Días restantes",
		flex: 5,
		renderCell: ({ value }) => (value === -1 ? "-" : value),
	},
];

const UserPackagesPage = () => {
	const { isLoading, error, data } = useQuery(
		["user-packages"],
		() => PackagesService.findMyPackages(),
		{ initialData: [] }
	);

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<Paper>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={5}
				autoHeight
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				loading={isLoading}
				error={error}
				// components={{
				// 	Toolbar: LocationsGridToolbar,
				// }}
			/>
		</Paper>
	);
};

export default UserPackagesPage;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

UserPackagesPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
