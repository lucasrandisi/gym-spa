import React from "react";
import * as Yup from "yup";
import { Button, DialogContent, DialogActions } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GridRowId } from "@mui/x-data-grid";
import PackagesService from "services/packages.service";
import { useSnackbar } from "notistack";
import ServicesGrid from "components/locations/services/ServicesGrid";

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
	const { enqueueSnackbar } = useSnackbar();
	const queryCache = useQueryClient();

	const save = useMutation(
		["save-package-services"],
		(values: EditPackageServicesValuesType) =>
			PackagesService.updatePackageServices(id, values.services),
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

	const handleSave = (values: EditPackageServicesValuesType) => {
		save.mutate(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSave}
			validationSchema={validationSchema}>
			{({ setFieldValue }) => (
				<Form>
					<DialogContent sx={{ p: 2 }}>
						<ServicesGrid
							services={services}
							onSelectionChange={(newSelection: GridRowId[]) => {
								setFieldValue("services", newSelection);
							}}
						/>
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
