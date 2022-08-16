import { IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { Exercise } from "models/exercise";
import Link from "next/link";
import ExerciseService from "services/exercise.service";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExerciseTableActions = ({ row }: { row: Row<Exercise> }) => {
	const queryClient = useQueryClient();
	const { original: exercise } = row;

	const mutation = useMutation(
		["delete-exercise"],
		(id: string) => ExerciseService.delete(id),
		{
			onError: err => {
				console.error(err);
			},
			onSuccess: () => {
				queryClient.fetchQuery(["excercises"]);
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

			<IconButton
				onClick={() => mutation.mutate(exercise.id.toString())}
				aria-label="delete">
				<DeleteIcon />
			</IconButton>
		</div>
	);
};

export default ExerciseTableActions;
