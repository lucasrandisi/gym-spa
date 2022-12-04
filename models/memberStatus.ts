export type MemberStatus = {
	id: number,
	name: string;
	nroDoc: string;
	birthDate: Date;
	lastPaymentDate: Date;
	expirationDate: Date;
	enabled: boolean;
	credentialsNonExpired: boolean;
	accountNonLocked: boolean;
	accountNonExpired: boolean;
}