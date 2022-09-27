import React from "react";
import {
	Accessibility,
	AccountCircle,
	Assignment,
	Badge,
	FitnessCenter,
	Home,
	PersonAdd,
} from "@mui/icons-material";

export type RouteType = {
	id: number;
	title: string;
	path: string;
	icon: any;
};

export const settings = [
	{
		id: 0,
		title: "Profile",
		path: "/profile",
		icon: <AccountCircle />,
	},
];

export const adminRoutes = [
    {
        id: 0,
        title: "Home",
        path: "/",
        icon: <Home />,
    },
	{
		id: 1,
		title: "Agregar",
		path: "/usuarios/nuevo",
		icon: <PersonAdd />,
    },
    {
        id: 2,
        title: "Usuarios",
        path: "/usuarios",
        icon: <Badge />,
    },
    {
        id: 3,
        title: "Rutinas",
        path: "/rutinas",
        icon: <Assignment />,
    },
    {
        id: 4,
        title: "Ejercicios",
        path: "/ejercicios",
        icon: <FitnessCenter />,
    },
    {
        id: 5,
        title: "Musculos",
        path: "/grupos-musculares",
        icon: <Accessibility />,
    },
];

export const userRoutes = [
    {
        id: 0,
        title: "Mi Rutina",
        path: "/mi-rutina",
        icon: <Assignment />,
    },
]
