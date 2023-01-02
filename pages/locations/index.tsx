import React, { ReactElement } from "react";

import {
	Button,
	Dialog,
	useMediaQuery,
	DialogTitle,
	Paper,
	Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

import MainLayout from "components/auth-layout/MainLayout";
import SearchSection from "components/search";
import LocationForm, { LocationFormValuesType } from "components/locations/LocationForm";
import LocationsService from "services/locations.service";
import LocationDataGridActions from "components/locations/LocationActions";

const columns: GridColDef[] = [
	{ field: "name", headerName: "Nombre", width: 300 },
	{ field: "address", headerName: "Dirección", flex: 5 },
	{
		field: "actions",
		headerName: "Acciones",
		flex: 1,
		filterable: false,
		sortable: false,
		disableColumnMenu: true,
		align: "center",
		renderCell: ({ row: { id } }): ReactElement => <LocationDataGridActions id={id} />,
	},
];

const LocationsGridToolbar = () => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const create = useMutation(
		["create-location"],
		(location: LocationFormValuesType) => LocationsService.create(location),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["locations"]);
				enqueueSnackbar("Establecimiento agregado", { variant: "success" });
			},
			onError: () => {
				enqueueSnackbar("Ups! Algo salió mal", { variant: "error" });
			},
		}
	);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = (location: LocationFormValuesType) => {
		handleClose();
		create.mutate(location);
	};

	return (
		<Box sx={{ display: "flex", p: "24px", alignItems: "center" }}>
			<Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
				Establecimientos
			</Typography>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "16px",
				}}>
				<SearchSection />

				<Button variant="contained" color="secondary" onClick={handleOpen}>
					Nuevo
				</Button>
			</Box>

			<Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
				<DialogTitle>Agregar establecimiento</DialogTitle>
				<LocationForm handleAdd={handleAdd} handleClose={handleClose} />
			</Dialog>
		</Box>
	);
};

const LocationsPage = () => {
	const { data, isLoading, error } = useQuery(
		["locations"],
		() => LocationsService.getAll(),
		{ initialData: [] }
	);

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
				components={{
					Toolbar: LocationsGridToolbar,
				}}
			/>
		</Paper>
	);
};

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}
LocationsPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default LocationsPage;
