import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import { NavItemType } from "./navItemType";

const icons = {
	HomeIcon,
	AssignmentIcon,
	PaymentIcon,
	StarIcon,
};

const member: NavItemType = {
	id: "member",
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
			id: "routine",
			title: "Mi Rutina",
			type: "item",
			icon: icons.AssignmentIcon,
			url: "/mi-rutina",
			target: true,
		},
		{
			id: "payments",
			title: "Pagos",
			type: "item",
			icon: icons.PaymentIcon,
			url: "/payments",
			target: true,
			chip: {
				label: "Nuevo!",
				color: "warning",
			},
		},
		{
			id: "packages",
			title: "Paquetes",
			type: "item",
			icon: icons.PaymentIcon,
			url: "/mis-paquetes",
			target: true,
		},
		{
			id: "packages",
			title: "Servicios",
			type: "item",
			icon: icons.StarIcon,
			url: "/packages/showcase",
			target: true,
		},
	],
};

export default member;
