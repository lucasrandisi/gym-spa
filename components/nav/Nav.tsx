import { CssBaseline, List, ListItemButton, Box } from "@mui/material";
import React from "react";
import logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import NavRoutes from "./NavRoutes";
import styles from "./Nav.module.css";

export default function Sidenav() {
	const router = useRouter();

	return (
		<Box sx={{ display: "flex", bgcolor: "primary.main", width: "12vw" }}>
			<CssBaseline />
			<Image src={logo} alt="logo" layout="responsive" />

			<List>
				{NavRoutes.map(item => (
					<Link href={item.path} key={item.title} passHref>
						<ListItemButton
							selected={router.pathname === item.path}
							className={styles.item}
						>
							{item.icon}
							<span>{item.title}</span>
						</ListItemButton>
					</Link>
				))}
			</List>
		</Box>
	);
}
