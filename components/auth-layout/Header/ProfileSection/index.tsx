import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import {
	Avatar,
	Box,
	Chip,
	ClickAwayListener,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Popper,
	Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

import PerfectScrollbar from "react-perfect-scrollbar";
import { useAuth } from "security/auth.context";
import Transitions from "../../../extended/Transitions";
import MainCard from "../../../cards/MainCard";

const ProfileSection = () => {
	const theme = useTheme();
	const router = useRouter();
	const auth = useAuth();
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [open, setOpen] = useState(false);

	/**
	 * anchorRef is used on different componets and specifying one type leads to other components throwing an error
	 * */
	const anchorRef = useRef(null);

	const handleLogout = async () => {
		auth.logout();
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const handleListItemClick = (event, index, route = "") => {
		setSelectedIndex(index);
		handleClose(event);

		if (route && route !== "") {
			router.push(route);
		}
	};
	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<>
			<Chip
				sx={{
					height: "48px",
					alignItems: "center",
					borderRadius: "27px",
					transition: "all .2s ease-in-out",
					borderColor: theme.palette.primary.light,
					backgroundColor: theme.palette.primary.light,
					'&[aria-controls="menu-list-grow"], &:hover': {
						borderColor: theme.palette.primary.main,
						background: `${theme.palette.primary.main}!important`,
						color: theme.palette.primary.light,
						"& svg": {
							stroke: theme.palette.primary.light,
						},
					},
					"& .MuiChip-label": {
						lineHeight: 0,
					},
				}}
				icon={
					<Avatar
						sx={{
							...theme.typography.mediumAvatar,
							margin: "8px 0 8px 8px !important",
							cursor: "pointer",
						}}
						ref={anchorRef}
						aria-controls={open ? "menu-list-grow" : undefined}
						aria-haspopup="true"
						color="inherit"
					/>
				}
				label={<SettingsIcon size="1.5rem" color={theme.palette.primary.main} />}
				variant="outlined"
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				color="primary"
			/>
			<Popper
				placement="bottom-end"
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				popperOptions={{
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, 14],
							},
						},
					],
				}}>
				{({ TransitionProps }) => (
					<Transitions in={open} {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MainCard
									border={false}
									elevation={16}
									content={false}
									boxShadow
									shadow={theme.shadows[16]}>
									<PerfectScrollbar
										style={{
											height: "100%",
											maxHeight: "calc(100vh - 900px)",
											overflowX: "hidden",
											display: "initial"
										}}>
										<Box>
											<List
												component="nav"
												sx={{
													width: "100%",
													maxWidth: 350,
													minWidth: 300,
													backgroundColor: theme.palette.background.paper,
													borderRadius: "10px",
													[theme.breakpoints.down("md")]: {
														minWidth: "100%",
													},
													"& .MuiListItemButton-root": {
														mt: 0.5,
													},
												}}>
												<ListItemButton
													sx={{ borderRadius: `3px` }}
													selected={selectedIndex === 0}
													onClick={event => handleListItemClick(event, 0, "/profile")}>
													<ListItemIcon>
														<SettingsIcon />
													</ListItemIcon>
													<ListItemText
														primary={
															<Typography variant="body2">Configuracion</Typography>
														}
													/>
												</ListItemButton>

												<ListItemButton
													sx={{ borderRadius: `3px` }}
													selected={selectedIndex === 4}
													onClick={handleLogout}>
													<ListItemIcon>
														<LogoutIcon />
													</ListItemIcon>
													<ListItemText
														primary={
															<Typography variant="body2">Cerrar sesión</Typography>
														}
													/>
												</ListItemButton>
											</List>
										</Box>
									</PerfectScrollbar>
								</MainCard>
							</ClickAwayListener>
						</Paper>
					</Transitions>
				)}
			</Popper>
		</>
	);
};

export default ProfileSection;
