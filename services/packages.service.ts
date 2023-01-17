import { api } from "./api";

type Package = {
	id: number;
	name: string;
	description: string;
	price: number;
	duration: number;
	active: boolean;
	services: Array<any>;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
};

export default class PackagesService {
	static getAll = async () => {
		const { data: packages } = await api.get<Array<Package>>("/api/packages");
		return packages;
	};

	static get = async (id: number) => {
		const { data: p } = await api.get<Package>(`/api/packages/${id}`);
		return p;
	};

	static create = async (values: any) => {
		const { data: p } = await api.post<Package>("/api/packages", values);
		return p;
	};

	static update = async (id: number, values: any) => {
		const { data: p } = await api.put<Package>(`/api/packages/${id}`, values);
		return p;
	};

	static delete = async (id: number) => {
		const { data: p } = await api.delete<Package>(`/api/packages/${id}`);
		return p;
	};
}
