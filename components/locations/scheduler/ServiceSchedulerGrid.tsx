//   calendar for scheduling events
import React from "react";
import { Calendar, momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SchedulerService from "services/scheduler.service";
import CalendarHeader from "./CalendarHeader";
import CalendarToolbar from "./CalendarToolbar";
import CalendarEventDialog from "./CalendarEventDialog";
import CalendarNewEventDialog from "./CalendarNewEventDialog.tsx";

const localizer = momentLocalizer(moment);

const ServiceSchedulerCalendar = ({ id = 1 }) => {
	const [slot, setSlot] = React.useState<any>(null);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<any>(null);

	const DragAndDropCalendar = withDragAndDrop(Calendar);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelectSlot = ({ start, end }: SlotInfo) => {
		setSlot({ start, end });
		handleOpen();
	};

	const handleSelectEvent = React.useCallback((event: any) => {
		setSelected(event);
	}, []);

	const locationSchedule = useQuery(
		["location-schedule", id],
		() => SchedulerService.getByLocation(id),
		{
			initialData: [],
		}
	);

	const handleEventDialogClose = () => {
		setSelected(null);
	};

	return (
		<div>
			<CalendarNewEventDialog
				locationId={id}
				slot={slot}
				open={open}
				onClose={handleClose}
			/>

			<CalendarEventDialog event={selected} onClose={handleEventDialogClose} />

			<Paper>
				<DragAndDropCalendar
					defaultView={Views.WEEK}
					views={[Views.WEEK, Views.DAY, Views.AGENDA]}
					events={locationSchedule.data}
					localizer={localizer}
					onSelectEvent={handleSelectEvent}
					onSelectSlot={handleSelectSlot}
					selectable
					timeslots={4}
					step={15}
					startAccessor={(event: any) => moment(event.start).toDate()}
					components={{
						toolbar: CalendarToolbar,
						header: CalendarHeader,
					}}
				/>
			</Paper>
		</div>
	);
};

export default ServiceSchedulerCalendar;
