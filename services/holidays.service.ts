import {api} from "./api";

type Holiday = {
    id: number;
    name: string;
    description: string;
    date: string;
    openTime: Date;
    closeTime: Date;
};

export default class HolidaysService {

    static getAll = async () => {
        const {data: holidays} = await api.get<Array<Holiday>>("/api/holidays");
        return holidays;
    };

    static get = async (id: number) => api.get<Holiday>(`/api/holidays/${id}`);

    static create = async (values: any) => {
        const {data: holiday} = await api.post<Holiday>("/api/holidays", values);
        return holiday;
    };

    static update = async (id: number, values: any) => {
        const {data: holiday} = await api.put<Holiday>(`/api/holidays/${id}`, values);
        return holiday;
    };

    static delete = async (id: number) => {
        const {data: holiday} = await api.delete<Holiday>(`/api/holidays/${id}`);
        return holiday;
    };
}