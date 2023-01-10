import { Formik, Form, Field, FieldArray } from "formik";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import LocationsService from "services/locations.service";

const daysOfWeek = [
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
	"Domingo",
];

type PropType = {
	id: number;
	data: Array<any>;
	disabled: Boolean;
};

function UpdateHoursForm({ id, data = [], disabled = false }: PropType) {
	const { enqueueSnackbar } = useSnackbar();
	const initialValues = {
		hours: [...data],
	};

	const update = useMutation(
		["update-business-hours", id],
		values => LocationsService.updateBusinessHours(id, values),
		{
			onSuccess: () => {
				enqueueSnackbar("Horarios actualizados", { variant: "success" });
			},
			onError: () => {
				enqueueSnackbar("Error al actualizar horarios", { variant: "error" });
			},
		}
	);

	const handleSubmit = (values, { setSubmitting }) => {
		update.mutate(values.hours);
		setSubmitting(false);
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({ values, isSubmitting, handleChange }) => (
				<Form>
					<FieldArray name="hours">
						{({ push, remove }) => (
							<div>
								{values.hours.map((hour, index) => (
									<div key={hour.id}>
										<Field
											id={`day-${hour.id}`}
											name={`hours.${index}.day`}
											component="select"
											disabled={disabled}
											value={hour.day}
											onChange={handleChange}>
											{daysOfWeek.map((day, i) => (
												<option key={day} value={i} label={day} />
											))}
										</Field>

										<Field
											id={`day-${hour.id}`}
											name={`hours.${index}.open`}
											type="time"
											disabled={disabled}
											onChange={handleChange}
										/>
										<Field
											id={`day-${hour.id}`}
											name={`hours.${index}.close`}
											type="time"
											disabled={disabled}
											onChange={handleChange}
										/>

										<button
											type="button"
											disabled={disabled}
											onClick={() => remove(index)}>
											remove
										</button>
									</div>
								))}
								<button
									type="button"
									className="secondary"
									disabled={disabled}
									onClick={() => push({ id: "", day: "", open: "", close: "" })}>
									Nuevo
								</button>
							</div>
						)}
					</FieldArray>
					<LoadingButton
						type="submit"
						variant="contained"
						loading={isSubmitting}
						disabled={disabled}>
						Guardar cambios
					</LoadingButton>
				</Form>
			)}
		</Formik>
	);
}

export default UpdateHoursForm;
