import { api } from "./api";

type Location = {
	id: number;
	name: string;
}

export default class LocationsService {
	
	static getAll = async () => {
		const { data: locations } = await api.get<Array<Location>>("/api/locations");
		return locations;
	};

	static get = async (id: number) => api.get<Location>(`/api/locations/${id}`);

	static create = async (values: any) => {
		const { data: location } = await api.post<Location>("/api/locations", values);
		return location;
	}

	static update = async (id: number, values: any) => {
		const { data: location } = await api.put<Location>(`/api/locations/${id}`, values);
		return location;
	}

	static delete = async (id: number) => {
		const { data: location } = await api.delete<Location>(`/api/locations/${id}`);
		return location;
	}
}
