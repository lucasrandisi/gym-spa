import React from "react";
import {
	CssBaseline,
	List,
	ListItemButton,
	Box,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	Avatar,
} from "@mui/material";
import logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { useAuth } from "security/auth.context";
import NavRoutes from "./NavRoutes";

export default function Sidenav() {
	const router = useRouter();

	const auth = useAuth();

	return (
		<Box sx={{ display: "flex" }}>
			<Paper elevation={0} sx={{ width: "13vw" }}>
				<CssBaseline />
				<Image src={logo} alt="logo" layout="responsive" />

				<List>
					{NavRoutes.map(item => (
						<ListItem key={item.id} disablePadding>
							<Link href={item.path} passHref>
								<ListItemButton selected={router.pathname === item.path}>
									<ListItemIcon>{item.icon} </ListItemIcon>
									<ListItemText
										primary={item.title}
										sx={{ fontSize: "1.4rem" }}
										disableTypography
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					))}

					<ListItem>
						<Link href="/profile" passHref>
							<ListItemButton>
								<Avatar src="https://randomuser.me/api/portraits/med/men/75.jpg" />
							</ListItemButton>
						</Link>
						<ListItemButton onClick={auth.logout}>Log out</ListItemButton>
					</ListItem>
				</List>
			</Paper>
		</Box>
	);
}
