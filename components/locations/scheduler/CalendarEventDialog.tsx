import { Card, Dialog, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";
import React from "react";
import { Close, Edit, Square } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SchedulerService from "services/scheduler.service";
import { useSnackbar } from "notistack";

interface CalendarEventDialogProps {
	event: any;
	onClose: () => void;
}

const CalendarEventDialog = ({ event, onClose }: CalendarEventDialogProps) => {
	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();

	const handleEdit = () => {
		console.log(`should edit event ${event.title}`);
	};

	const remove = useMutation(
		["delete-event-calendar"],
		() => SchedulerService.delete(event.id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["location-schedule"]);
				enqueueSnackbar("Evento eliminado", { variant: "success" });
				onClose();
			},
			onError: () => {
				enqueueSnackbar("Ups algo salió mal", { variant: "error" });
			},
		}
	);

	if (!event) return null;

	return (
		<Dialog open={Boolean(event)} onClose={onClose}>
			<Card
				sx={{
					width: "400px",
					padding: ".5rem",
				}}>
				<Grid container direction="column">
					{/* Action buttons */}
					<Grid
						container
						xs={12}
						direction="row"
						justifyContent="flex-end"
						sx={{ padding: "8px 6px" }}>
						<Tooltip title="Editar evento">
							<IconButton onClick={handleEdit} aria-label="edit">
								<Edit />
							</IconButton>
						</Tooltip>
						<Tooltip title="Eliminar evento">
							<IconButton onClick={() => remove.mutate()} aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Cerrar">
							<IconButton onClick={onClose} aria-label="close" sx={{ pl: "20px" }}>
								<Close />
							</IconButton>
						</Tooltip>
					</Grid>

					<Grid
						container
						xs={12}
						sx={{
							minHeight: "32px",
							marginBottom: "12px",
						}}>
						<Grid item xs={2} display="flex" sx={{ paddingLeft: "28px" }}>
							<Square />
						</Grid>
						<Grid item xs={10}>
							<Typography variant="h3" component="h2">
								{event.title}
							</Typography>
							<Typography>
								{moment(event.start).format("dddd")} |
								{moment(event.start).format("HH:mm")} -{" "}
								{moment(event.end).format("HH:mm")}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</Dialog>
	);
};

export default CalendarEventDialog;
