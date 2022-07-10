import React from "react";
import { Assignment, Badge, FitnessCenter, Home, Settings } from "@mui/icons-material";

const NavRoutes = [
	{
		id: 1,
		title: "Miembros",
		path: "/",
		icon: <Badge fontSize="large" />,
	},
	{
		id: 2,
		title: "Rutinas",
		path: "/rutinas",
		icon: <Assignment fontSize="large" />,
	},
	{
		id: 3,
		title: "Ejercicios",
		path: "/ejercicios",
		icon: <FitnessCenter fontSize="large" />,
	},
	{
		id: 4,
		title: "Settings",
		path: "/settings",
		icon: <Settings fontSize="large" />,
	},
];

export default NavRoutes;
