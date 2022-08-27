import { Rol } from "./rol"

export type User = {
	id: number,
	nroDoc: string;
	name: string;
	email: string,
	roles: Array<Rol>
}