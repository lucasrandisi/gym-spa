/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
	Avatar,
	Box,
	ButtonBase,
	Card,
	Grid,
	InputAdornment,
	OutlinedInput,
	Popper,
} from "@mui/material";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import { shouldForwardProp } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import Transitions from "../extended/Transitions";

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
	zIndex: 1100,
	width: "99%",
	top: "-55px !important",
	padding: "0 12px",
	[theme.breakpoints.down("sm")]: {
		padding: "0 10px",
	},
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
	width: 280,
	paddingLeft: 16,
	paddingRight: 16,
	height: 41,
	borderRadius: 8,
	"& input": {
		background: "transparent !important",
		paddingLeft: "4px !important",
	},
	[theme.breakpoints.down("lg")]: {
		width: 250,
	},
	[theme.breakpoints.down("md")]: {
		width: "100%",
		marginLeft: 4,
		background: "#fff",
	},
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
	...theme.typography.commonAvatar,
	...theme.typography.mediumAvatar,
	background: theme.palette.secondary.light,
	color: theme.palette.secondary.dark,
	"&:hover": {
		background: theme.palette.secondary.dark,
		color: theme.palette.secondary.light,
	},
}));

type SearchSectionProps = {
	onChange: React.ChangeEventHandler;
};

const MobileSearch = ({ onChange }: SearchSectionProps) => (
	<OutlineInputStyle
		id="input-search-header"
		// value={value}
		onChange={onChange}
		placeholder="Buscar"
		startAdornment={
			<InputAdornment position="start">
				<SearchIcon />
			</InputAdornment>
		}
		aria-describedby="search-helper-text"
		inputProps={{ "aria-label": "weight" }}
	/>
);

MobileSearch.propTypes = {
	value: PropTypes.string,
	setValue: PropTypes.func,
	popupState: PopupState,
};

const SearchSection = ({ onChange }: SearchSectionProps) => {
	const theme = useTheme();

	return (
		<>
			<Box sx={{ display: { xs: "block", md: "none" } }}>
				<PopupState variant="popper" popupId="demo-popup-popper">
					{popupState => (
						<>
							<Box sx={{ ml: 2 }}>
								<ButtonBase sx={{ borderRadius: "12px" }}>
									<HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
										<SearchIcon />
									</HeaderAvatarStyle>
								</ButtonBase>
							</Box>
							<PopperStyle {...bindPopper(popupState)} transition>
								{({ TransitionProps }) => (
									<Transitions
										type="zoom"
										{...TransitionProps}
										sx={{ transformOrigin: "center left" }}>
										<Card
											sx={{
												background: "#fff",
												[theme.breakpoints.down("sm")]: {
													border: 0,
													boxShadow: "none",
												},
											}}>
											<Box sx={{ p: 2 }}>
												<Grid
													container
													alignItems="center"
													justifyContent="space-between">
													<Grid item xs>
														<MobileSearch onChange={onChange} popupState={popupState} />
													</Grid>
												</Grid>
											</Box>
										</Card>
									</Transitions>
								)}
							</PopperStyle>
						</>
					)}
				</PopupState>
			</Box>
			<Box sx={{ display: { xs: "none", md: "block" } }}>
				<OutlineInputStyle
					id="input-search-header"
					onChange={onChange}
					placeholder="Buscar"
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					}
					aria-describedby="search-helper-text"
					inputProps={{ "aria-label": "weight" }}
				/>
			</Box>
		</>
	);
};

export default SearchSection;
