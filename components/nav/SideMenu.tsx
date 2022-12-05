import React from "react";
import Link from "next/link";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { adminRoutes, userRoutes, RouteType } from "components/nav/NavRoutes";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import { useAuth } from "security/auth.context";

const drawerWidth = 160;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	})
);

export const RouteGroup = ({ items, open }: { items: RouteType[]; open: boolean }) => {
	const router = useRouter();
	return (
		<List>
			{items.map((route: RouteType) => (
				<Link key={route.id} href={route.path} passHref>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemButton
							selected={router.pathname === route.path}
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}>
								{route.icon}
							</ListItemIcon>
							<ListItemText primary={route.title} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				</Link>
			))}
		</List>
	);
};

const SideNavMenu = ({ open }: { open: boolean }) => {
	const { user } = useAuth();

    return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader />

			<Box
				sx={{
					flexGrow: 2,
					display: { md: "flex", flexDirection: "column" },
				}}>

                {user?.roles.some(r => r.name === "Admin") && (
					<div>
						<Divider />
                        <RouteGroup items={adminRoutes} open={open} />
					</div>
                )}
                
                {user?.roles.some(r => r.name === "User" ) && (
                    <div>
                        <Divider />
                        <RouteGroup items={userRoutes} open={open} />
                    </div>
                )}
			</Box>
		</Drawer>
	);
};

export default SideNavMenu;
