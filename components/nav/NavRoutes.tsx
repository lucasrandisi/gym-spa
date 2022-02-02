import React from "react";
import { Assignment, Badge, FitnessCenter, Home, Settings } from "@mui/icons-material";

const NavRoutes = [
	{
		id: 1,
		title: "Inicio",
		path: "/",
		icon: <Home fontSize="large" />,
	},
	{
		id: 2,
		title: "Miembros",
		path: "/clientes",
		icon: <Badge fontSize="large" />,
	},
	{
		id: 3,
		title: "Rutinas",
		path: "/rutinas",
		icon: <Assignment fontSize="large" />,
	},
	{
		id: 4,
		title: "Ejercicios",
		path: "/ejercicios",
		icon: <FitnessCenter fontSize="large" />,
	},
	{
		id: 5,
		title: "Settings",
		path: "/settings",
		icon: <Settings fontSize="large" />,
	},
];

export default NavRoutes;
