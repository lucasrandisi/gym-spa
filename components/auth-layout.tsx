import { Box } from "@mui/system";
import React, { ReactNode, useState } from "react";
import Sidenav from "./sidenav";

export default function AuthLayout({ children }: { children: ReactNode }) {
    const accesos = ["Clientes", "Rutinas", "Ejercicios"];

    const [selectedAcceso, setSelectedAcceso] = useState(accesos[0]);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidenav
                accesos={accesos}
                selectedAcceso={selectedAcceso}
                setSelectedAcceso={setSelectedAcceso}
            ></Sidenav>
            {children}
        </Box>
    );
}
