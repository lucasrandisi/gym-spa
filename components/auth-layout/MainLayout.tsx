import React, { ReactNode } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

// styles
const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })(
	({ theme, open }) => ({
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			[theme.breakpoints.up("md")]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`,
			},
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
				marginRight: "10px",
			},
		}),
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
			},
		}),
	})
);

const MainLayout = ({ children }: { children: ReactNode }) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const handleLeftDrawerToggle = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: open ? theme.transitions.create("width") : "none",
				}}>
				<Toolbar>
					<Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
				</Toolbar>
			</AppBar>

			<Sidebar drawerOpen={open} drawerToggle={handleLeftDrawerToggle} />

			<Main theme={theme} open={open}>
				{/* breadcrumb */}
				{/* <Breadcrumbs
					separator={QuestionMarkIcon}
					navigation={navigation}
					icon
					title
					rightAlign
				/>
				<Outlet /> */}
				{children}
			</Main>
		</Box>
	);
};

export default MainLayout;
