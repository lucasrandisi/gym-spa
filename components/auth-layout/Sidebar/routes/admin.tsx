import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GradeIcon from "@mui/icons-material/Grade";
import StoreIcon from "@mui/icons-material/Store";
import { NavItemType } from "./navItemType";

const icons = {
	HomeIcon,
	PersonAddIcon,
	GroupIcon,
	SettingsIcon,
	ExitToAppIcon,
	AssignmentIcon,
	FitnessCenterIcon,
	AccessibilityIcon,
	StoreIcon,
	CalendarMonthIcon,
	GradeIcon,
};

const admin: NavItemType = {
	id: "Admin",
	title: "Admin",
	type: "group",
	children: [
		{
			id: "home",
			title: "Home",
			type: "item",
			icon: icons.HomeIcon,
			url: "/",
			target: true,
		},
		{
			id: "usuarios",
			title: "Usuarios",
			type: "collapse",
			icon: icons.GroupIcon,
			children: [
				{
					id: "nuevo",
					title: "Nuevo",
					type: "item",
					url: "/usuarios/nuevo",
					target: true,
				},
				{
					id: "listado",
					title: "Listado",
					type: "item",
					url: "/usuarios",
					target: true,
				},
			],
		},
		{
			id: "rutinas",
			title: "Rutinas",
			type: "item",
			icon: icons.AssignmentIcon,
			url: "/rutinas",
			target: true,
		},
		{
			id: "configuracion",
			title: "Configuración",
			type: "collapse",
			icon: icons.SettingsIcon,
			children: [
				{
					id: "ejercicios",
					title: "Ejercicios",
					type: "item",
					icon: icons.FitnessCenterIcon,
					url: "/ejercicios",
					target: true,
				},
				{
					id: "grupos-musculares",
					title: "Grupos Musculares",
					type: "item",
					icon: icons.AccessibilityIcon,
					url: "/grupos-musculares",
					target: true,
				},
				{
					id: "locations",
					title: "Establecimientos",
					type: "item",
					icon: icons.StoreIcon,
					url: "/locations",
				},
				{
					id: "calendar",
					title: "Calendario",
					type: "item",
					icon: icons.CalendarMonthIcon,
					url: "/calendar",
				},
				{
					id: "services",
					title: "Servicios",
					type: "item",
					icon: icons.GradeIcon,
					url: "/services",
				},
				{
					id: "packages",
					title: "Paquetes",
					type: "item",
					// icon: <SvgIcon>{icons.PackageIcon}</SvgIcon>,
					url: "/packages",
				},
			],
		},
	],
};

export default admin;
