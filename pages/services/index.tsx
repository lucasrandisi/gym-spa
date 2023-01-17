import React, { ReactElement } from "react";

import { Button, Dialog, useMediaQuery, Paper, Typography, Chip } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

import MainLayout from "components/auth-layout/MainLayout";
import SearchSection from "components/search";
import ServiceForm, { ServiceFormValuesType } from "components/services/ServiceForm";
import ServiceDataGridActions from "components/services/ServiceActions";

import ServicesService from "services/services.service";
import { services } from "../../components/services/data";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "name", headerName: "Nombre", flex: 1 },
	{ field: "description", headerName: "Descripcion", flex: 2 },
	{
		field: "type",
		headerName: "Tipo",
		width: 100,
		renderCell: ({ value }) => {
			switch (value) {
				case "class":
					return <Chip label="Clase" color="primary" />;
				case "package":
					return <Chip label="Paquete" color="secondary" />;
				case "service":
					return <Chip label="Servicio" color="success" />;
				case "activity":
					return <Chip label="Actividad" color="warning" />;
				default:
					return <Chip label="Otro" color="error" />;
			}
		},
	},
	{
		field: "actions",
		headerName: "Acciones",
		flex: 0,
		filterable: false,
		sortable: false,
		disableColumnMenu: true,
		align: "center",
		renderCell: ({ row: { id } }): ReactElement => <ServiceDataGridActions id={id} />,
	},
];

const ServicesGridToolbar = () => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const create = useMutation(
		["create-service"],
		(service: ServiceFormValuesType) => ServicesService.create(service),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["services"]);
				enqueueSnackbar("Servicio creado con exito", { variant: "success" });
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

	const handleAdd = (service: ServiceFormValuesType) => {
		create.mutate(service);
		if (create.isSuccess) handleClose();
	};

	return (
		<Box
			sx={{
				display: "flex",
				p: "24px",
				alignItems: "center",
				justifyContent: "space-between",
			}}>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
					Servicios
				</Typography>
			</Box>

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
				<Typography variant="h2" component="h1" sx={{ flexGrow: 1, p: "24px", pb: 0 }}>
					Nuevo servicio
				</Typography>
				<ServiceForm handleAdd={handleAdd} handleClose={handleClose} />
			</Dialog>
		</Box>
	);
};

const ServicesPage = () => {
	const { data, isLoading, error } = useQuery(["services"], () => services, {
		initialData: [],
	});

	return (
		<Paper>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={5}
				autoHeight
				checkboxSelection
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				loading={isLoading}
				error={error}
				components={{
					Toolbar: ServicesGridToolbar,
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

ServicesPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default ServicesPage;
