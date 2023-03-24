import React from "react";
import * as Yup from "yup";
import { Button, DialogContent, DialogActions } from "@mui/material";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GridRowId } from "@mui/x-data-grid";
import LocationsService from "services/locations.service";
import { useSnackbar } from "notistack";
import ServicesGrid from "./ServicesGrid";

const initialValues = {
	services: [],
};

export type EditLocationServicesValuesType = typeof initialValues;

const validationSchema = Yup.object({});

interface EditLocationServicesProps {
	id: number; // Location ID
	services: number[]; // Location services
	handleClose: () => void;
}

const EditLocationServices = ({
	id,
	services,
	handleClose,
}: EditLocationServicesProps) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryCache = useQueryClient();

	const save = useMutation(
		["save-location-services"],
		(values: EditLocationServicesValuesType) =>
			LocationsService.updateLocationServices(id, values.services),
		{
			onSuccess: () => {
				queryCache.invalidateQueries(["location-services", id]);
				enqueueSnackbar("Servicios actualizados", { variant: "success" });
				handleClose();
			},
			onError: () => {
				enqueueSnackbar("Ups! Algo salió mal", { variant: "error" });
			},
		}
	);

	const handleSave = (values: EditLocationServicesValuesType) => {
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

export default EditLocationServices;
