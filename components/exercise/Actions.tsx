import React from "react";
import { IconButton, Snackbar } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Exercise } from "models/exercise";
import Link from "next/link";
import ExerciseService from "services/exercise.service";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExerciseTableActions = ({ exercise }: { exercise: Exercise }) => {
	const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
	const queryClient = useQueryClient();

	const mutation = useMutation(
		["delete-exercise"],
		() => ExerciseService.delete(exercise.id),
		{
			onError: err => {
				// TODO: push error notification to snackbar 
				console.error(err);
			},
			onSuccess: () => {
				queryClient.fetchQuery(["excercises"]);
				setOpenDeleteSnackbar(true);
			},
		}
	);

	return (
		<div>
			<Link href={`/ejercicios/${exercise.id}`} passHref>
				<IconButton aria-label="edit">
					<EditIcon />
				</IconButton>
			</Link>

			<IconButton onClick={() => mutation.mutate()} aria-label="delete">
				<DeleteIcon />
			</IconButton>

			<Snackbar
				open={openDeleteSnackbar}
				message="Ejercicio eliminado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</div>
	);
};

export default ExerciseTableActions;
