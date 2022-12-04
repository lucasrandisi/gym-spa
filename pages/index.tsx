import React, { ReactElement, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthLayout from "components/auth-layout/auth-layout";
import { Box, Button, Chip } from "@mui/material";
import Header from "components/header/header";
import moment from "moment";
import UserService from "services/user.service";
import { MemberStatus } from "models/memberStatus";
import styles from "../components/home/home.module.scss";

const statuses = {
	AllowAccess: "Acceso Permitido",
	PaymentRequired: "Pago Requerido",
	UserNotFound: "Usuario no encontrado",
	None: "No hay datos",
} as const;

type UserStatusType = typeof statuses;
type UserStatus = UserStatusType[keyof UserStatusType];

function colorFromStatus(status: UserStatus): string {
	switch (status) {
		case statuses.AllowAccess:
			return "#A8DCD1";
		case statuses.PaymentRequired:
			return "#e9c46a";
		case statuses.UserNotFound:
			return "#ff4400b8";
		case statuses.None:
		default:
			return "#b5b3b3";
	}
}

function isPaymentRequired(user: MemberStatus) {
	if (user.expirationDate == null) {
		return true;
	}
	const expirationDate = moment(user.expirationDate);
	const today = moment();
	return expirationDate.isBefore(today);
}

function getChipStatus(user: MemberStatus) {
	if (user.lastPaymentDate === null) {
		return "No se ha realizado ningún pago";
	}

	if (isPaymentRequired(user)) {
		return "Pago vencido";
	}

	return "Pago vigente";
}

const HomePage = () => {
	const [nroDoc, setNroDoc] = useState("");
	const [userStatus, setUserStatus] = useState<UserStatus>(statuses.None);
	const [user, setUser] = useState<MemberStatus | null>();

	async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		const searchValue = event.target.value;
		setNroDoc(searchValue);

		if (searchValue.length !== 8) {
			setUser(null);
			setUserStatus(statuses.None);
			return;
		}

		UserService.getByDoc(searchValue)
			.then(u => {
				setUser(u);
				if (!isPaymentRequired(u)) {
					setUserStatus(statuses.AllowAccess);
					return;
				}
				setUserStatus(statuses.PaymentRequired);
			})
			.catch(() => {
				setUser(null);
				setUserStatus(statuses.UserNotFound);
			});
	}

	return (
		<>
			<Header title="Bienvenido" />
			<Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
				<TextField
					id="outlined-name"
					label="Nro de Documento"
					value={nroDoc}
					onChange={handleChange}
					type="number"
					className={styles.numberInput}
					sx={{ width: "30%" }}
					inputProps={{ maxLength: 8 }}
				/>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
				<Box
					className={styles.userInfoBox}
					sx={{
						bgcolor: colorFromStatus(userStatus),
					}}>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						{user ? (
							<Box>
								<Chip label={getChipStatus(user)} />
								<Box>{isPaymentRequired(user) && <Button>Pagar</Button>}</Box>
							</Box>
						) : (
							<Chip label={userStatus} />
						)}
					</Box>

					<Box className={styles.userDataRow}>Nombre: {user?.name}</Box>
					<Box className={styles.userDataRow}>
						Vencimiento:
						{user?.expirationDate
							? moment(user.expirationDate).format("DD/MM/YYYY")
							: "-"}
					</Box>
				</Box>
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
