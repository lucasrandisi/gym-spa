import { api } from "./api";

type Service = {
	id: number;
	name: string;
	description: string;
	type: string;

	locations: Array<any>;
	packages: Array<any>;
	services: Array<any>;

	price: number;
	duration: number;
	durationType: string;
	capacity: number;
	capacityType: string;
	capacityTypeValue: string;
};

export default class ServicesService {
	static getAll = async () => {
		const { data: services } = await api.get<Array<Service>>("/api/services");
		return services;
	};

	static get = async (id: number) => api.get<Service>(`/api/services/${id}`);

	static create = async (values: any) => {
		const { data: service } = await api.post<Service>("/api/services", values);
		return service;
	};

	static update = async (id: number, values: any) => {
		const { data: service } = await api.put<Service>(`/api/services/${id}`, values);
		return service;
	};

	static delete = async (id: number) => {
		const { data: service } = await api.delete<Service>(`/api/services/${id}`);
		return service;
	};
}
