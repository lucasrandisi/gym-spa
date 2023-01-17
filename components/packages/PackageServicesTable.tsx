import React from "react";

import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";

import SearchSection from "components/search";
import EditIcon from "@mui/icons-material/Edit";

const columns: GridColDef[] = [{ field: "name", headerName: "Servicio", flex: 1 }];

const PackageServicesGridToolbar = () => {
	const handleAdd = () => {};

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

				<Tooltip title="Editar">
					<IconButton color="secondary" onClick={handleAdd}>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Box>
	);
};

const PackageServicesTable = ({ services = [] }) => (
	<Paper>
		<DataGrid
			rows={services}
			columns={columns}
			pageSize={5}
			autoHeight
			localeText={esES.components.MuiDataGrid.defaultProps.localeText}
			components={{
				Toolbar: PackageServicesGridToolbar,
			}}
		/>
	</Paper>
);

export default PackageServicesTable;
