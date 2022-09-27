import { Rol } from "./rol"
import { Routine } from "./routine";

export type User = {
	id: number,
	nroDoc: string;
	name: string;
	email: string,
    roles: Array<Rol>
    routine: Routine;
    payment: string;
}