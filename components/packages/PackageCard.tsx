import React from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";

import MainCard from "components/cards/MainCard";
import { Package } from "services/packages.service";
import moment from "moment";
import { BiPackage } from "react-icons/bi";
import { TimerOutlined } from "@mui/icons-material";
import SkeletonPackageCard from "./SkeletonPackageCard";

type PackageCardProps = {
	item: Package;
	loading?: boolean;
};

const PackageCard = ({ item, loading }: PackageCardProps) => {
	const theme = useTheme();

	if (loading) {
		return <SkeletonPackageCard />;
	}

	return (
		<MainCard border={false} content={false} boxShadow={theme.shadows[1]}>
			<Box sx={{ p: 2.25 }}>
				<Grid container direction="column">
					<Grid item>
						<Grid container alignItems="center">
							<Grid item>
								<Typography
									sx={{
										fontSize: "1.125rem",
										fontWeight: 1000,
										mr: 1,
										mb: 0.75,
									}}>
									{item.name}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container alignItems="center">
							<Grid item>
								<Typography
									sx={{
										fontSize: "1rem",
										fontWeight: 500,
										mr: 1,
										mb: 0.75,
									}}>
									{item.price.toLocaleString("es-AR", {
										style: "currency",
										currency: "ARS",
									})}
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					{/* Features */}
					<Grid item>
						<Grid container alignItems="center" gap={1}>
							<Tooltip title="Servicios">
								<Grid
									item
									display="inline-flex"
									alignItems="flex-end"
									sx={{
										border: "1.5px solid #e0e0e0",
										borderRadius: "0.7rem",
									}}>
									<Avatar
										variant="rounded"
										sx={{
											...theme.typography.commonAvatar,
											...theme.typography.mediumAvatar,
											background: theme.palette.secondary.light,
											color: theme.palette.secondary.dark,
										}}>
										<BiPackage />
									</Avatar>

									<Box sx={{ ml: 0.5 }}>
										<Typography
											sx={{
												fontSize: "1rem",
												fontWeight: 500,
												mr: 1,
												mb: 0.75,
											}}>
											x {item.services.length}
										</Typography>
									</Box>
								</Grid>
							</Tooltip>

							<Tooltip title="Duracion">
								<Grid
									item
									display="inline-flex"
									alignItems="flex-end"
									sx={{
										border: "1.5px solid #e0e0e0",
										borderRadius: "0.7rem",
									}}>
									<Avatar
										variant="rounded"
										sx={{
											...theme.typography.commonAvatar,
											...theme.typography.mediumAvatar,
											background: theme.palette.secondary.light,
											color: theme.palette.secondary.dark,
										}}>
										<TimerOutlined fontSize="small" />
									</Avatar>

									<Box sx={{ ml: 0.5 }}>
										<Typography
											sx={{
												fontSize: "1rem",
												fontWeight: 500,
												mr: 1,
												mb: 0.75,
											}}>
											{moment.duration(item.duration, "days").humanize(false, { d: 60 })}
										</Typography>
									</Box>
								</Grid>
							</Tooltip>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</MainCard>
	);
};

PackageCard.propTypes = {
	item: PropTypes.element,
	loading: PropTypes.bool,
};

PackageCard.defaultProps = {
	item: {},
	loading: false,
};

export default PackageCard;
