import { Button, Card, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "styles/index.module.scss";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import Image from "next/image";
import portada from "public/images/portada.jpeg";
import { AccountCircle } from "@mui/icons-material";

export default function Home() {
    const [adminLogin, setAdminLogin] = useState(true);

    const formik = useFormik({
        initialValues: adminLogin
            ? {
                  email: "",
                  password: "",
              }
            : { dni: "" },
        onSubmit: (values: any) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={styles.background}>
            <Card className={styles.card}>
                <div className={styles.leftContainer}>
                    <h1>Login</h1>
                    <h2>Bienvenido al gimnasio</h2>
                    <form onSubmit={formik.handleSubmit}>
                        {adminLogin ? (
                            <React.Fragment>
                                <TextField
                                    id="email"
                                    className={styles.input}
                                    label="Email"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AlternateEmailIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    id="password"
                                    type="password"
                                    className={styles.input}
                                    label="Password"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <LockIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />{" "}
                            </React.Fragment>
                        ) : (
                            <TextField
                                id="dni"
                                className={styles.input}
                                label="Dni"
                                variant="outlined"
                                value={formik.values.dni}
                                onChange={formik.handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircle fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <Button variant="contained">Iniciar Sesión</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setAdminLogin(!adminLogin)}
                        >
                            {adminLogin
                                ? "Ingresar como administrador"
                                : "Ingresar como cliente"}
                        </Button>
                    </form>
                </div>
                <div className={styles.rightContainer}>
                    <Image
                        src={portada}
                        alt="imagen portada"
                        layout="fill"
                        priority
                    />
                </div>
            </Card>
        </div>
    );
}
