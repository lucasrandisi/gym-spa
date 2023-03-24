// Description: This is the page that displays the details of a location
import React, { ReactElement } from "react";

import { useQuery } from "@tanstack/react-query";

import { useTheme, styled, alpha } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

import LocationsService from "services/locations.service";
import MainLayout from "components/auth-layout/MainLayout";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationBusinessHoursGrid from "components/locations/businessHours/BusinessHoursGrid";
import MainCard from "components/cards/MainCard";
import { NextPageContext } from "next";
import LocationServicesTable from "components/locations/services/LocationServicesTable";

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const LocationPage = ({ id }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const theme = useTheme();

	const getLocation = useQuery(["location", id], () => LocationsService.get(id), {
		enabled: !!id,
	});

	const services = useQuery(
		["location-services", id],
		() => LocationsService.getAllServices(id),
		{
			initialData: [],
		}
	);

	const location: any = getLocation.data?.data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={4} sm={6}>
				<MainCard title={location?.name}>
					<Grid container spacing={2}>
						<Grid item>
							<Button
								id="demo-customized-button"
								aria-controls={open ? "demo-customized-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								variant="contained"
								disableElevation
								onClick={handleClick}
								endIcon={<KeyboardArrowDownIcon />}>
								Options
							</Button>
							<StyledMenu
								id="demo-customized-menu"
								MenuListProps={{
									"aria-labelledby": "demo-customized-button",
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}>
								<MenuItem onClick={handleClose} disableRipple>
									<EditIcon />
									Edit
								</MenuItem>
								<MenuItem onClick={handleClose} disableRipple>
									<FileCopyIcon />
									Duplicate
								</MenuItem>
								<Divider sx={{ my: 0.5 }} />
								<MenuItem onClick={handleClose} disableRipple>
									<ArchiveIcon />
									Archive
								</MenuItem>
								<MenuItem onClick={handleClose} disableRipple>
									<MoreHorizIcon />
									More
								</MenuItem>
							</StyledMenu>
						</Grid>
						<Grid container xs={12} alignItems="center">
							<LocationOn sx={{ color: theme.palette.primary.main }} />{" "}
							<Typography variant="body1" component="p">
								{location?.address}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" component="p">
								{location?.phone}
							</Typography>
						</Grid>
					</Grid>
				</MainCard>
			</Grid>

			<Grid item xs={12} md={4} sm={6}>
				<LocationServicesTable id={id} services={services.data?.data} />
			</Grid>
			<Grid item xs={12} md={4} sm={6}>
				<LocationBusinessHoursGrid id={id} />
			</Grid>
		</Grid>
	);
};

LocationPage.getInitialProps = async (ctx: NextPageContext) => {
	const { id } = ctx.query;
	return {
		id,
		isProtected: true,
		userTypes: ["Admin"],
	};
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default LocationPage;
