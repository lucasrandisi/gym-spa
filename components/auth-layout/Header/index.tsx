import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoSection from "../LogoSection";
import NotificationSection from "./NotificationSection";
import ProfileSection from "./ProfileSection";

const Header = ({ handleLeftDrawerToggle }: any) => {
	const theme = useTheme();

	return (
		<>
			<Box
				sx={{
					width: 200,
					display: "flex",
					[theme.breakpoints.down("md")]: {
						width: "auto",
					},
				}}>
				<Box component="span" sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
					<LogoSection />
				</Box>
				<ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
					<Avatar
						variant="rounded"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: "all .2s ease-in-out",
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							"&:hover": {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light,
							},
						}}
						onClick={handleLeftDrawerToggle}
						color="inherit">
						<MenuIcon sx={{ size: "1.3rem" }} />
					</Avatar>
				</ButtonBase>
			</Box>

			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			<NotificationSection />
			<ProfileSection />
		</>
	);
};

Header.propTypes = {
	handleLeftDrawerToggle: PropTypes.func,
};

Header.defaultProps = {
	handleLeftDrawerToggle: () => {},
};

export default Header;
