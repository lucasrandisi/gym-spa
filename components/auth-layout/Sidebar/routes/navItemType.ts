import { ChipTypeMap } from "@mui/material";

export type NavItemType = {
	id: string;
	title: string;
	caption?: string;
	type: "group" | "item" | "collapse" | "extLink";
	children?: NavItemType[];
	icon?: any;
	url?: string;
	target?: boolean;
	badge?: {
		title: string;
		type: string;
	};
	external?: boolean;
	disabled?: boolean;
	chip?: ChipTypeMap["props"];
};
