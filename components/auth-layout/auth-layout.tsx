import React, { ReactNode } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ListItemIcon from "@mui/material/ListItemIcon";
import { Menu, MenuItem, Tooltip, Avatar } from "@mui/material";
import { FitnessCenter, Logout } from "@mui/icons-material";
import { useAuth } from "security/auth.context";
import SideNavMenu from "components/nav/SideMenu";

export default function AuthLayout({ children }: { children: ReactNode }) {
	const auth = useAuth();
	const [open, setOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleDrawerToggle = () => {
		setOpen(prev => !prev);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<SideNavMenu open={open} />
			<AppBar
				position="fixed"
				elevation={0}
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton
							color="inherit"
							aria-label="toggle open drawer"
							onClick={handleDrawerToggle}
							edge="start"
							sx={{ mr: 1.5 }}>
							<MenuIcon />
						</IconButton>

						<FitnessCenter sx={{ display: { xs: "none", md: "flex" }, mr: 0.5 }} />
						<Link href="/" passHref>
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="/"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontFamily: "fantasy",
									fontWeight: 400,
									letterSpacing: ".1rem",
									color: "inherit",
									textDecoration: "none",
								}}>
								FitnessWorld
							</Typography>
						</Link>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem onClick={auth.logout}>
								<ListItemIcon sx={{ mr: 0.5 }}>
									<Logout />
								</ListItemIcon>
								<Typography textAlign="center">Log out</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>

			<Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
				<div style={{ padding: "1rem" }}>{children}</div>
			</Box>
		</Box>
	);
}
