import { List, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Sidenav({
    accesos,
    selectedAcceso,
    setSelectedAcceso,
}: {
    accesos: string[];
    selectedAcceso: string;
    setSelectedAcceso: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <Box sx={{ bgcolor: "primary.main", width: "12vw" }}>
            <Image src={logo} alt="logo" layout="responsive"></Image>

            <List>
                {accesos.map((acceso) => (
                    <Link
                        href={`/${acceso.toLowerCase()}`}
                        key={acceso}
                        passHref
                    >
                        <ListItemButton
                            onClick={() => setSelectedAcceso(acceso)}
                            sx={{
                                color: "white",
                                fontSize: "1.7rem",
                                marginTop: "1vh",
                                backgroundColor:
                                    selectedAcceso === acceso
                                        ? "primary.light"
                                        : "primary.main",
                            }}
                        >
                            {acceso}
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </Box>
    );
}
