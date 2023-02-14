import admin from "./admin";
import member from "./member";
import { NavItemType } from "./navItemType";

const menuItems = {
	items: [admin, member] as NavItemType[]
};

export default menuItems;
