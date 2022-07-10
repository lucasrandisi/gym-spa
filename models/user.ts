import { Rol } from "./rol"

export type User = {
    id: number,
    email: string,
    roles: Array<Rol>
}