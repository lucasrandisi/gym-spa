import React, { ReactElement, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthLayout from "components/auth-layout/auth-layout";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import Header from "components/header/header";
import moment from "moment";
import UserService from "services/user.service";
import { MemberStatus } from "models/memberStatus";
import { PaidSharp } from "@mui/icons-material";
import PaymentService from "services/payment.service";
import { useSnackbar } from "notistack";
import styles from "../components/home/home.module.scss";

const statuses = {
	AllowAccess: { message: "Acceso Permitido", primary: "#A8DCD1", secondary: "#A8DCD1" },
	PaymentRequired: {
		message: "Pago Requerido",
		primary: "#e9c46a",
		secondary: "#F9C7C7",
	},
	UserNotFound: {
		message: "Usuario no encontrado",
		primary: "#ff4400b8",
		secondary: "#F9C7C7",
	},
	None: { message: "No hay datos", primary: "#b5b3b3", secondary: "#F9C7C7" },
} as const;

type UserStatusType = typeof statuses;
type UserStatus = UserStatusType[keyof UserStatusType];

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
	const { enqueueSnackbar } = useSnackbar();

	async function getMemberStatus(value: string) {
		UserService.getByDoc(value)
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

	async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		const searchValue = event.target.value;
		setNroDoc(searchValue);

		if (searchValue.length !== 8) {
			setUser(null);
			setUserStatus(statuses.None);
			return;
		}

		await getMemberStatus(searchValue);
	}

	async function updatePayment(id: number) {
		PaymentService.createPayment({ userId: id, amount: 1000 })
			.then(() => {
				getMemberStatus(nroDoc);
				enqueueSnackbar("Pago realizado con éxito", { variant: "success" });
			})
			.catch(() => {
				enqueueSnackbar("Error al realizar el pago", { variant: "error" });
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
				<Box className={styles.userInfoBox} sx={{ bgcolor: userStatus.primary }}>
					<Box>
						{user ? (
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}>
								<Chip label={getChipStatus(user)} />
								{isPaymentRequired(user) && (
									<Tooltip title="Registrar pago">
										<IconButton onClick={() => updatePayment(user.id)}>
											<PaidSharp />
										</IconButton>
									</Tooltip>
								)}
							</Box>
						) : (
							<Chip label={userStatus.message} />
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
