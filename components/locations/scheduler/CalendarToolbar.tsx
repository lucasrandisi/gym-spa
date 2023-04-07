import React from "react";
import { ToolbarProps, View } from "react-big-calendar";

const CalendarToolbar = ({ onView, views }: ToolbarProps) => (
	<div>
		{views.map(view => (
			<button key={view} type="button" onClick={() => onView(view)}>
				{view}
			</button>
		))}
	</div>
);

export default CalendarToolbar;
