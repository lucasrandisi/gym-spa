import React from "react";
import {
	AccountCircle,
	Assignment,
	Badge,
	FitnessCenter,
	Home,
	PersonAdd,
	Settings,
} from "@mui/icons-material";

export type RouteType = {
	id: number;
	title: string;
	path: string;
	icon: any;
};

export const routes = [
	{
		id: 0,
		title: "Home",
		path: "/",
		icon: <Home />,
	},
	{
		id: 1,
		title: "Miembros",
		path: "/miembros",
		icon: <Badge />,
	},
	{
		id: 2,
		title: "Rutinas",
		path: "/rutinas",
		icon: <Assignment />,
	},
	{
		id: 3,
		title: "Ejercicios",
		path: "/ejercicios",
		icon: <FitnessCenter />,
	},
	{
		id: 4,
		title: "Settings",
		path: "/settings",
		icon: <Settings />,
	},
];

export default routes;

export const settings = [
	{
		id: 0,
		title: "Profile",
		path: "/profile",
		icon: <AccountCircle />,
	},
];

export const admin = [
	{
		id: 0,
		title: "Roles",
		path: "/protected",
		icon: <PersonAdd />,
	},
];
