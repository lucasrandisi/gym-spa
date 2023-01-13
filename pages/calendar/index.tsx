import React, { ReactElement } from "react";

import { Button, Dialog, useMediaQuery, Paper, Typography, Chip } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

import MainLayout from "components/auth-layout/MainLayout";
import SearchSection from "components/search";
import HolidayForm, { HolidayFormValuesType } from "components/holidays/HolidayForm";
import HolidaysService from "services/holidays.service";
import HolidayDataGridActions from "components/holidays/HolidayActions";
import moment from "moment";

const columns: GridColDef[] = [
	{
		field: "date",
		headerName: "Fecha",
		width: 100,
		disableColumnMenu: true,
		valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
	},
	{ field: "name", headerName: "Nombre", flex: 1 },
	{ field: "description", headerName: "Descripcion", flex: 2 },
	{
		field: "businessHours",
		headerName: "Horas de atención",
		width: 140,
		disableColumnMenu: true,
		sortable: false,
		valueFormatter: params => moment(params?.value, "HH:mm").format("HH:mm"),
		renderCell: ({ row: { openTime, closeTime } }) => {
			if (openTime === closeTime) {
				return <Chip label="Cerrado" color="error" variant="outlined" />;
			}
			return (
				<Typography variant="body2">
					{moment(openTime, "HH:mm").format("HH:mm")} -{" "}
					{moment(closeTime, "HH:mm").format("HH:mm")}
				</Typography>
			);
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
		renderCell: ({ row: { id } }): ReactElement => <HolidayDataGridActions id={id} />,
	},
];

const HolidaysGridToolbar = () => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const create = useMutation(
		["create-holiday"],
		(holiday: HolidayFormValuesType) => HolidaysService.create(holiday),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["holidays"]);
				enqueueSnackbar("Feriado creado", { variant: "success" });
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

	const handleAdd = (holiday: HolidayFormValuesType) => {
		create.mutate(holiday);
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
					Feriados
				</Typography>
				<Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
					Feriados y fechas especiales
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
					Nuevo feriado
				</Typography>
				<HolidayForm handleAdd={handleAdd} handleClose={handleClose} />
			</Dialog>
		</Box>
	);
};

const CalendarPage = () => {
	const { data, isLoading, error } = useQuery(
		["holidays"],
		() => HolidaysService.getAll(),
		{ initialData: [] }
	);

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
					Toolbar: HolidaysGridToolbar,
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

CalendarPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default CalendarPage;
