import React from "react";

import {
	Dialog,
	IconButton,
	Paper,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";

import SearchSection from "components/search";
import EditIcon from "@mui/icons-material/Edit";
import EditPackageServices from "./EditPackageServiceForm";

const columns: GridColDef[] = [{ field: "name", headerName: "Servicio", flex: 1 }];

type PackageServicesGridToolbarProps = {
	id: number;
	services: any[];
	handleSearch: React.ChangeEventHandler;
};

const PackageServicesGridToolbar = ({
	id,
	services,
	handleSearch,
}: PackageServicesGridToolbarProps) => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				<SearchSection onChange={handleSearch} />

				<Tooltip title="Editar">
					<IconButton color="secondary" onClick={handleOpen}>
						<EditIcon />
					</IconButton>
				</Tooltip>

				<Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
					<Typography variant="h2" component="h1" sx={{ flexGrow: 1, p: "24px", pb: 0 }}>
						Servicios del paquete
					</Typography>
					<EditPackageServices
						id={id}
						services={services.map((s: { id: number }) => s.id)}
						handleClose={handleClose}
					/>
				</Dialog>
			</Box>
		</Box>
	);
};

const PackageServicesTable = ({ id = 1, services = [] }) => {
	const [search, setSearch] = React.useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const filterModel = {
		items: [
			{
				columnField: "name",
				operatorValue: "contains",
				value: search,
			},
		],
	};

	return (
		<Paper>
			<DataGrid
				rows={services}
				columns={columns}
				pageSize={5}
				autoHeight
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				filterModel={filterModel}
				components={{
					Toolbar: PackageServicesGridToolbar,
				}}
				componentsProps={{
					toolbar: { id, services, handleSearch },
				}}
			/>
		</Paper>
	);
};

export default PackageServicesTable;
