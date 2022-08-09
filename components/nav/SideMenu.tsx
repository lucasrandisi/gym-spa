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
import { admin, routes } from "components/nav/NavRoutes";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";

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

const SideNavMenu = ({ open }: { open: boolean }) => {
	const router = useRouter();

	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader />

			<Box
				sx={{
					flexGrow: 2,
					display: { md: "flex", flexDirection: "column" },
				}}>
				<List>
					{routes.map(route => (
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

				<Divider />

				<List>
					{admin.map(route => (
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
			</Box>
		</Drawer>
	);
};

export default SideNavMenu;
