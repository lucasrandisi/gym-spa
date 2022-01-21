import React from "react";
import {
	AssignmentRounded,
	BadgeRounded,
	FitnessCenterRounded,
	HomeRounded,
	SettingsRounded,
} from "@mui/icons-material";

const NavRoutes = [
	{
		id: 1,
		title: "Inicio",
		path: "/",
		icon: <HomeRounded fontSize="large" />,
	},
	{
		id: 2,
		title: "Miembros",
		path: "/clientes",
		icon: <BadgeRounded fontSize="large" />,
	},
	{
		id: 3,
		title: "Rutinas",
		path: "/rutinas",
		icon: <AssignmentRounded fontSize="large" />,
	},
	{
		id: 4,
		title: "Ejercicios",
		path: "/ejercicios",
		icon: <FitnessCenterRounded fontSize="large" />,
	},
	{
		id: 5,
		title: "Settings",
		path: "/settings",
		icon: <SettingsRounded fontSize="large" />,
	},
];

export default NavRoutes;
