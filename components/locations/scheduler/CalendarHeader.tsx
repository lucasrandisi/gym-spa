import React from "react";
import { HeaderProps } from "react-big-calendar";

const CalendarHeader = ({ date, localizer }: HeaderProps) => (
	<span>{localizer.format(date, "dddd")}</span>
);

export default CalendarHeader;
