import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Card } from "@mui/material";

import styles from "styles/pages/login.module.scss";
import portada from "public/images/portada.jpeg";
import LoginForm from "components/login/LoginForm";
import { useAuth } from "security/auth.context";

function LoginPage() {
	const router = useRouter();
	const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
        if (user.roles.includes("admin")) {
            router.push("/");
        } else {
            router.push("/mi-rutina");
        }
	}

	return (
		<div className={styles.background}>
			<Card className={styles.card}>
				<div className={styles.leftContainer}>
					<h1>Login</h1>
					<h2>Bienvenido al gimnasio</h2>
					<LoginForm />
				</div>
				<div className={styles.rightContainer}>
					<Image src={portada} alt="imagen portada" layout="fill" priority />
				</div>
			</Card>
		</div>
	);
}

export default LoginPage;
