import React, { ReactElement } from "react";
import {
	Box,
	Button,
	Dialog,
	Paper,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SearchSection from "components/search";
import { useSnackbar } from "notistack";
import PackagesService from "services/packages.service";
import moment from "moment";
import PackageForm, { PackageFormValuesType } from "./PackageForm";
import PackagesDataGridActions from "./PackagesActions";

const columns: GridColDef[] = [
	{ field: "name", headerName: "Nombre", flex: 1 },
	{ field: "description", headerName: "Descripcion", flex: 2 },
	{
		field: "price",
		headerName: "Precio",
		flex: 1,
		type: "number",
		renderCell: ({ value }) => `$${value}`,
	},
	{
		field: "duration",
		headerName: "Duración",
		flex: 0,
		type: "number",
		renderCell: ({ value }) => moment.duration(value, "days").humanize(false, { d: 60 }),
	},
	{
		field: "active",
		headerName: "Activo",
		flex: 0,
		type: "boolean",
		renderCell: ({ value }) => (value ? "Si" : "No"),
	},
	{
		field: "actions",
		headerName: "Acciones",
		flex: 0,
		filterable: false,
		sortable: false,
		disableColumnMenu: true,
		align: "center",
		renderCell: ({ row: { id } }): ReactElement => <PackagesDataGridActions id={id} />,
	},
];

const PackagesGridToolbar = () => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const create = useMutation(
		["create-package"],
		(values: PackageFormValuesType) => PackagesService.create(values),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["packages"]);
				enqueueSnackbar("Paquete de servicios creado con exito", { variant: "success" });
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

	const handleAdd = (service: PackageFormValuesType) => {
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
					Paquetes
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
					Nuevo paquete de servicios
				</Typography>
				<PackageForm handleAdd={handleAdd} handleClose={handleClose} />
			</Dialog>
		</Box>
	);
};

const PackagesTable = () => {
	const { data, isLoading, error } = useQuery(["packages"], PackagesService.getAll, {
		initialData: [],
	});

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
					Toolbar: PackagesGridToolbar,
				}}
			/>
		</Paper>
	);
};

export default PackagesTable;
