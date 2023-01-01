import { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
	Avatar,
	Badge,
	Box,
	Button,
	ButtonBase,
	CardActions,
	ClickAwayListener,
	Divider,
	Grid,
	Paper,
	Popper,
	Typography,
	useMediaQuery,
} from "@mui/material";
import NotificationIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import MainCard from "../../../cards/MainCard";
import Transitions from "../../../extended/Transitions";
import NotificationList from "./NotificationList";

const NotificationSection = () => {
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

	const [open, setOpen] = useState(false);

	const [notifications, setNotifications] = useState([
		{
			id: 1,
			avatar: "/static/images/avatars/avatar_1.png",
			title: "New order received",
			link: "/",
			status: "unread",
			date: moment().subtract(2, "hours"),
		},
		{
			id: 2,
			title: "Rutina actualizada",
			avatar: (
				<Avatar
					sx={{
						color: theme.palette.success.dark,
						backgroundColor: theme.palette.success.light,
						border: "none",
						borderColor: theme.palette.success.main,
					}}>
					<CheckCircleIcon />
				</Avatar>
			),
			description: "Tienes una nueva rutina disponible",
			status: "read",
			date: moment().subtract(3, "hours"),
		},
		{
			id: 3,
			title: "New order received",
			description: "All done! Now check your inbox as you're in for a sweet treat",
			image: {
				src: "/static/images/products/product_1.png",
				alt: "product",
			},
			status: "unread",
			date: moment().subtract(3, "hours"),
			avatar: (
				<Avatar
					sx={{
						color: theme.palette.success.dark,
						backgroundColor: theme.palette.success.light,
						border: "none",
						borderColor: theme.palette.success.main,
					}}>
					<CheckCircleIcon />
				</Avatar>
			),
		},
	]);

	/**
	 * anchorRef is used on different componets and specifying one type leads to other components throwing an error
	 * */
	const anchorRef = useRef(null);

	const markAllAsRead = () => {
		// Mark all notifications as read
		setNotifications(prevNotifications => {
			const newNotifications = [...prevNotifications];
			newNotifications.forEach(notification => {
				if (notification.status === "unread") {
					notification.status = "read";
				}
			});
			return newNotifications;
		});
	};

	const unreadNotifications = notifications.filter(
		notification => notification.status === "unread"
	);

	const handleToggle = () => {
		if (open) {
			markAllAsRead();
		}
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
		markAllAsRead();
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
			<Box
				sx={{
					ml: 2,
					mr: 3,
					[theme.breakpoints.down("md")]: {
						mr: 2,
					},
				}}>
				<ButtonBase sx={{ borderRadius: "12px" }}>
					<Badge badgeContent={unreadNotifications.length} color="error">
						<Avatar
							variant="rounded"
							sx={{
								...theme.typography.commonAvatar,
								...theme.typography.mediumAvatar,
								transition: "all .2s ease-in-out",
								background: theme.palette.secondary.light,
								color: theme.palette.secondary.dark,
								'&[aria-controls="menu-list-grow"],&:hover': {
									background: theme.palette.secondary.dark,
									color: theme.palette.secondary.light,
								},
							}}
							ref={anchorRef}
							aria-controls={open ? "menu-list-grow" : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
							color="inherit">
							<NotificationIcon />
						</Avatar>
					</Badge>
				</ButtonBase>
			</Box>
			<Popper
				placement={matchesXs ? "bottom" : "bottom-end"}
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
								offset: [matchesXs ? 5 : 0, 20],
							},
						},
					],
				}}>
				{({ TransitionProps }) => (
					<Transitions
						position={matchesXs ? "top" : "top-right"}
						in={open}
						{...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MainCard
									border={false}
									elevation={16}
									content={false}
									boxShadow
									shadow={theme.shadows[16]}>
									<Grid container direction="column" spacing={2}>
										<Grid item xs={12}>
											<Grid
												container
												alignItems="center"
												justifyContent="space-between"
												sx={{ pt: 2, px: 2 }}>
												<Typography variant="subtitle1">Notificaciones</Typography>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<PerfectScrollbar
												style={{
													height: "100%",
													maxHeight: "calc(100vh - 205px)",
													overflowX: "hidden",
													display: "initial"
												}}>
												<Grid item xs={12} p={0}>
													<Divider sx={{ my: 0 }} />
												</Grid>
												<NotificationList notifications={notifications} />
											</PerfectScrollbar>
										</Grid>
									</Grid>

									<Divider />
									<CardActions sx={{ p: 1.25, justifyContent: "center" }}>
										<Button size="small" disableElevation>
											Ver todas
										</Button>
									</CardActions>
								</MainCard>
							</ClickAwayListener>
						</Paper>
					</Transitions>
				)}
			</Popper>
		</>
	);
};

export default NotificationSection;
