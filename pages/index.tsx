import React, { ReactElement, useState } from "react";
import TextField from '@mui/material/TextField';
import { api } from "services/api";
import styles from '../components/home/home.module.scss';
import AuthLayout from "components/auth-layout/auth-layout";
import { Box } from "@mui/material";
import Header from "components/header/header";
import moment from 'moment';
import { User } from "models/user";
import theme from "styles/theme";

enum UserStatus {
    AllowAccess,
    PaymentRequired,
    UserNotFound,
}

const HomePage = () => {
    const [nroDoc, setNroDoc] = useState("");
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.UserNotFound);
    const [user, setUser] = useState<User | null>();

    async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const searchValue = event.target.value;
        setNroDoc(searchValue);

        if (searchValue.length === 8) {
            const response = await api.get(`/api/users/nro-doc/${searchValue}`)
            const user: User = response.data;
        
            setUser(user);

            if (user) {
                if (moment(user.payment).add(1, "months").isAfter(moment())) {
                    setUserStatus(UserStatus.AllowAccess);
                } else {
                    setUserStatus(UserStatus.PaymentRequired);
                }
            } else {
                setUserStatus(UserStatus.UserNotFound);
            }
        } else {
            setUser(null);
            setUserStatus(UserStatus.UserNotFound);
        }
    }

    return (
        <>
            <Header title="Bienvenido" />
            <Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
                <TextField
                id="outlined-name"
                label="Nro de Documento"
                value={nroDoc}
                onChange={handleChange}
                type="number"
                className={styles.numberInput}
                sx={{width: "30%"}}
                />
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: 4}}>
                <Box className={styles.userInfoBox}
                    sx={{
                        bgcolor: userStatus === UserStatus.AllowAccess
                            ? "#ff4400b8"
                            : userStatus === UserStatus.PaymentRequired
                                ? "secondary.main"
                                : "#b5b3b3"
                    }}
                >
                    <Box className={styles.userDataRow}>Nombre: {user?.name}</Box>
                    <Box className={styles.userDataRow}>Documento: {user?.nroDoc}</Box>
                    <Box className={styles.userDataRow}>Última Fecha de Pago: {user ? moment(user?.payment).format("DD/MM/YYYY") : null}</Box>
                </Box>
                {
                    userStatus === UserStatus.PaymentRequired
                        ? <Box className={styles.paymentRequired} sx={{ bgcolor: "secondary.main" }}>Pago Requerido</Box>
                        : null
                }
            </Box>
        </>
	);
};

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
