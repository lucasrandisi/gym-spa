import React from "react";
import {
	Box,
	IconButton,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";
import SkeletonEarningCard from "components/cards/skeleton/SkeletonEarningCard";
import { api } from "services/api";
import UpdateHoursForm from "./UpdateHoursForm";

const LocationBusinessHoursGrid = ({ id }) => {
	const [edit, setEdit] = React.useState(false);

	const data = useQuery(["business-hours", id], () =>
		api.get(`api/locations/${id}/business-hours`).then(res => res.data)
	);

	if (data.isLoading) return <SkeletonEarningCard />;

	if (data.isError) return <pre>{JSON.stringify(data.error, null, 2)}</pre>;

	return (
		<Box>
			<Typography variant="h3" component="h2" sx={{ mt: 2 }}>
				Horarios
			</Typography>
			<IconButton size="small" onClick={() => setEdit(!edit)}>
				<EditIcon />
			</IconButton>

			<UpdateHoursForm id={id} disabled={!edit} data={data.data} />
		</Box>
	);
};

export default LocationBusinessHoursGrid;
