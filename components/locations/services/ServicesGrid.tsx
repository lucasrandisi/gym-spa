import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ServicesService from "services/services.service";
import { DataGrid, GridColDef, esES, GridRowId } from "@mui/x-data-grid";

import SearchSection from "components/search";

const columns: GridColDef[] = [{ field: "name", headerName: "Nombre", flex: 1 }];

interface EditLocationServicesProps {
	services: number[]; // Default selected services
	// eslint-disable-next-line no-unused-vars
	onSelectionChange: (selection: GridRowId[]) => void; // Callback to update parent state
}

const ServicesGrid = ({ services, onSelectionChange }: EditLocationServicesProps) => {
	const [selection, setSelection] = React.useState<GridRowId[]>(services);
	const [search, setSearch] = React.useState<string>("");

	const { data, isLoading, error } = useQuery(["all-services"], ServicesService.getAll, {
		initialData: [],
	});

	React.useEffect(() => {
		setSelection(services);
	}, [services]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	// Update selection state and call parent callback
	const handleSelectionChange = (newSelection: GridRowId[]) => {
		setSelection(newSelection);
		onSelectionChange(newSelection);
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
		<Grid container rowGap={2} columnSpacing={2}>
			<Grid item xs={6}>
				<SearchSection onChange={handleSearch} />
			</Grid>

			<Grid item xs={12}>
				<DataGrid
					rows={data}
					columns={columns}
					loading={isLoading}
					error={error}
					checkboxSelection
					selectionModel={selection}
					onSelectionModelChange={handleSelectionChange}
					filterModel={filterModel}
					rowsPerPageOptions={[]}
					sx={{
						"& .MuiDataGrid-row": { cursor: "pointer" },
						height: 400,
					}}
					localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				/>
			</Grid>
		</Grid>
	);
};

ServicesGrid.propsTypes = {
	services: PropTypes.arrayOf(PropTypes.number),
	onSelectionChange: PropTypes.func,
};

export default ServicesGrid;
