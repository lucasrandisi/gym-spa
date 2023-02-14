import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import {
	Avatar,
	Chip,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/router";
import { NavItemType } from "../routes/navItemType";

const NavItem = ({ item, level }: { item: NavItemType; level: number }) => {
	const router = useRouter();

	const Icon = item.icon;
	const itemIcon = item?.icon ? (
		<Icon stroke={1.5} size="1.3rem" />
	) : (
		<FiberManualRecordIcon fontSize={level > 0 ? "inherit" : "medium"} />
	);

	let itemTarget = "_self";
	if (item.target) {
		itemTarget = "_blank";
	}

	return (
		<Link key={item.id} href={item.url!} passHref target={itemTarget}>
			<ListItemButton
				disabled={item.disabled}
				sx={{
					mb: 0.5,
					alignItems: "flex-start",
					backgroundColor: level > 1 ? "transparent !important" : "inherit",
					py: level > 1 ? 1 : 1.25,
					pl: `${level * 24}px`,
				}}
				selected={router.pathname === item.url}>
				<ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
					{itemIcon}
				</ListItemIcon>
				<ListItemText
					primary={<Typography color="inherit">{item.title}</Typography>}
					secondary={
						item.caption && (
							<Typography variant="caption" display="block" gutterBottom>
								{item.caption}
							</Typography>
						)
					}
				/>

				{item.chip && (
					<Chip
						color={item.chip.color}
						variant={item.chip.variant}
						size={item.chip.size}
						label={item.chip.label}
						avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
					/>
				)}
			</ListItemButton>
		</Link>
	);
};

NavItem.propTypes = {
	item: PropTypes.node.isRequired,
	level: PropTypes.number.isRequired,
};

export default NavItem;
