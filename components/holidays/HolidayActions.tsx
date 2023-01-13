import React from "react";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import HolidaysService from "services/holidays.service";
import { styled, alpha } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface HolidayDataGridActionsProps {
	id: number;
}

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

const HolidayDataGridActions = ({ id }: HolidayDataGridActionsProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const deleteHoliday = useMutation(
		["delete-holiday"],
		() => HolidaysService.delete(id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["holidays"]);
				enqueueSnackbar("Feriado eliminado", { variant: "success" });
			},
			onError: () => {
				enqueueSnackbar("Ups! Algo salió mal", { variant: "error" });
			},
		}
	);

	return (
		<div>
			<IconButton
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>

			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}>
				{/* <MenuItem
					id="holiday-detail-button"
					disableRipple
					onClick={() => router.push(`/holidays/${id}`)}>
					<VisibilityIcon />
					Ver
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					<EditIcon />
					Editar
				</MenuItem> */}
				<MenuItem onClick={() => deleteHoliday.mutate()} disableRipple>
					<DeleteIcon />
					Eliminar
				</MenuItem>
			</StyledMenu>
		</div>
	);
};
export default HolidayDataGridActions;
