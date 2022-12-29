import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import { NavItemType } from "./navItemType";

const icons = {
	HomeIcon,
	AssignmentIcon,
	PaymentIcon,
};

const member: NavItemType = {
	id: "member",
	title: "Members",
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
				label: "2",
				color: "primary",
			},
		},
	],
};

export default member;
