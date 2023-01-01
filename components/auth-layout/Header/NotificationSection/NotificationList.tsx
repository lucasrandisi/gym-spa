import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// utils
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

// styles
const ListItemWrapper = styled("div")(({ theme, status }) => ({
	cursor: "pointer",
	padding: 16,
	background: status === "read" ? "transparent" : theme.palette.primary.light,
	"&:hover": {
		background: theme.palette.primary.light,
	},
	"& .MuiListItem-root": {
		padding: 0,
	},
}));

const ImageSkeleton = ({ theme, alt }) => (
	<Grid container>
		<Grid item xs={12}>
			<Card
				sx={{
					backgroundColor: theme.palette.secondary.light,
				}}>
				<CardContent>
					<Grid container direction="column">
						<Grid item xs={12}>
							<Stack direction="row" spacing={2}>
								<PhotoIcon />
								<Typography variant="subtitle1">{alt}</Typography>
							</Stack>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	</Grid>
);

const NotificationList = ({ notifications = [] }: any[]) => {
	const theme = useTheme();

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 430,
				minWidth: 360,
				py: 0,
				borderRadius: "10px",
				[theme.breakpoints.down("md")]: {
					maxWidth: 300,
				},
				"& .MuiListItemSecondaryAction-root": {
					top: 22,
				},
				"& .MuiDivider-root": {
					my: 0,
				},
				"& .list-container": {
					pl: 7,
				},
			}}>
			{notifications.map(item => (
				<Box key={item.id}>
					<ListItemWrapper status={item.status}>
						<ListItem alignItems="center">
							<ListItemAvatar>
								{typeof item.avatar === "string" ? (
									<Avatar alt={item.title} src={item.avatar} />
								) : (
									item.avatar
								)}
							</ListItemAvatar>
							<ListItemText primary={item.title} />

							<ListItemSecondaryAction>
								<Grid container justifyContent="flex-end">
									<Grid container xs={12} flexDirection="column" alignItems="center">
										<Typography variant="caption" display="block">
											{moment(item.date).fromNow()}
										</Typography>
										<Grid item xs={12}>
											{item.status === "unread" && (
												<FiberManualRecordIcon
													sx={{ color: "error.main", height: "13px" }}
												/>
											)}
										</Grid>
									</Grid>
								</Grid>
							</ListItemSecondaryAction>
						</ListItem>

						<Grid container direction="column" className="list-container">
							<Grid item xs={12}>
								<Typography variant="subtitle2">{item.description}</Typography>
							</Grid>

							{item.image && (
								<Grid item xs={12} sx={{ pt: 2 }}>
									<ImageSkeleton theme={theme} alt={item.image.alt} />
									{/* <CardMedia
										component="img"
										height="140"
										image={item.image.src}
										alt={item.image.alt}
									/> */}
								</Grid>
							)}
						</Grid>
					</ListItemWrapper>
					<Divider />
				</Box>
			))}
		</List>
	);
};

export default NotificationList;
