import React from "react";
import * as Yup from "yup";
import { Grid, Button, DialogContent, DialogActions } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ServicesService from "services/services.service";
import { DataGrid, GridColDef, esES, GridRowId } from "@mui/x-data-grid";
import PackagesService from "services/packages.service";
import { useSnackbar } from "notistack";
import SearchSection from "components/search";

const columns: GridColDef[] = [{ field: "name", headerName: "Nombre" }];

const initialValues = {
	services: [],
};

export type EditPackageServicesValuesType = typeof initialValues;

const validationSchema = Yup.object({});

interface EditPackageServicesProps {
	id: number; // Package ID
	services: number[]; // Package services
	handleClose: () => void;
}

const EditPackageServices = ({ id, services, handleClose }: EditPackageServicesProps) => {
	const [selection, setSelection] = React.useState<GridRowId[]>(services);
	const { enqueueSnackbar } = useSnackbar();
	const queryCache = useQueryClient();

	const { data, isLoading, error } = useQuery(["all-services"], ServicesService.getAll, {
		initialData: [],
	});

	React.useEffect(() => {
		setSelection(services);
	}, [services]);

	const save = useMutation(
		["save-package-services"],
		() => PackagesService.updatePackageServices(id, selection.map(Number)),
		{
			onSuccess: () => {
				queryCache.invalidateQueries(["package-services", id]);
				enqueueSnackbar("Servicios actualizados", { variant: "success" });
				handleClose();
			},
			onError: () => {
				enqueueSnackbar("Ups! Algo salió mal", { variant: "error" });
			},
		}
	);

	const handleSave = () => {
		save.mutate();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSave}
			validationSchema={validationSchema}>
			{({ setFieldValue }) => (
				<Form>
					<DialogContent sx={{ p: 2 }}>
						<Grid container rowGap={2} columnSpacing={2}>
							<Grid item xs={6}>
								<SearchSection />
							</Grid>

							<Grid item xs={12}>
								<DataGrid
									rows={data}
									columns={columns}
									autoHeight
									localeText={esES.components.MuiDataGrid.defaultProps.localeText}
									loading={isLoading}
									error={error}
									checkboxSelection
									selectionModel={selection}
									onSelectionModelChange={newSelection => {
										setSelection(newSelection);
										setFieldValue("services", selection);
									}}
									rowsPerPageOptions={[]}
									sx={{ "& .MuiDataGrid-row": { cursor: "pointer" }, width: 570 }}
								/>
							</Grid>
						</Grid>
					</DialogContent>

					<DialogActions sx={{ p: 2 }}>
						<Button onClick={handleClose}>Cancel</Button>
						<Button variant="contained" color="primary" type="submit">
							Guardar
						</Button>
					</DialogActions>
				</Form>
			)}
		</Formik>
	);
};

export default EditPackageServices;
