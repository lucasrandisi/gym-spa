import React from "react";
import * as Yup from "yup";
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	FormControlLabel,
	Grid,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SchedulerService from "services/scheduler.service";
import { useSnackbar } from "notistack";
import { GridRowId } from "@mui/x-data-grid";
import { Formik, Form, Field } from "formik";
import ServicesService from "services/services.service";
import ServicesGrid from "../services/ServicesGrid";

interface CalendarNewEventDialogProps {
	open: boolean;
	slot: any;
	locationId: number;
	onClose: () => void;
}

const validationSchema = Yup.object({});

const CalendarNewEventDialog = ({
	open,
	slot,
	locationId,
	onClose,
}: CalendarNewEventDialogProps) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const services = useQuery(["services"], ServicesService.getAll, {
		initialData: [],
	});

	const save = useMutation(
		["save-location-scheduled-event"],
		values => SchedulerService.create(values),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["location-schedule", locationId]);
				enqueueSnackbar("Servicios actualizados", { variant: "success" });
				onClose();
			},
			onError: () => {
				enqueueSnackbar("Ups! Algo salió mal", { variant: "error" });
			},
		}
	);

	const handleSave = (values: any) => {
		save.mutate(values);
	};

	const initialValues = {
		locationId,
		serviceId: 0,
		service: "",
		allDay: false,
		from: moment(slot?.start).format("HH:mm"),
		to: moment(slot?.end).format("HH:mm"),
		dayOfWeek: moment(slot?.start).weekday(),
		// repeat: false,
		// repeatEvery: 1,
		// repateOn: [],
		// repeatUntil: moment().add(1, "month").format("YYYY-MM-DD"),
		// repeatsEnds: "never",
		// repeatsEndsAfter: 1,
		// repeatsEndsOn: moment().add(1, "month").format("YYYY-MM-DD"),
	};

	return (
		<Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
			<Typography variant="h2" component="h1" sx={{ flexGrow: 1, p: "24px", pb: 0 }}>
				Nuevo evento
			</Typography>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSave}
				validationSchema={validationSchema}>
				{({ values, touched, errors, setFieldValue }) => (
					<Form>
						<DialogContent sx={{ p: 2 }}>
							<ServicesGrid
								services={services}
								multiple={false}
								onSelectionChange={(newSelection: GridRowId[]) => {
									setFieldValue("serviceId", newSelection.pop());
								}}
							/>

							<Grid item xs={6}>
								<Field
									type="checkbox"
									name="allDay"
									as={FormControlLabel}
									control={<Checkbox />}
									label="Todo el día"
									checked={values.allDay}
									error={Boolean(touched.allDay && errors.allDay)}
									helperText={touched.allDay && errors.allDay}
									onChange={() => {
										setFieldValue("allDay", !values.allDay);
									}}
								/>
							</Grid>
						</DialogContent>

						<DialogActions sx={{ p: 2 }}>
							<Button onClick={onClose}>Cancel</Button>
							<Button variant="contained" color="primary" type="submit">
								Guardar
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default CalendarNewEventDialog;
