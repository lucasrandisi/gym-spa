import {api} from "./api";

type Schedule = {
    id: number;
};

export default class SchedulerService {

    static getAll = async () => {
        const {data: schedules} = await api.get<Array<Schedule>>("/api/schedules");
        return schedules;
    };

    static get = async (id: number) => api.get<Schedule>(`/api/schedules/${id}`);

    static create = async (values: any) => {
        const {data: schedule} = await api.post<Schedule>("/api/schedules", values);
        return schedule;
    };

    static update = async (id: number, values: any) => {
        const {data: schedule} = await api.put<Schedule>(`/api/schedules/${id}`, values);
        return schedule;
    };

    static delete = async (id: number) => {
        const {data: schedule} = await api.delete<Schedule>(`/api/schedules/${id}`);
        return schedule;
    };

    static getByLocation = async (locationId: number) => {
        const {data: schedules} = await api.get<Array<Schedule>>(`/api/schedules/location/${locationId}`);
        return schedules;
    }

    static getByService = async (serviceId: number) => {
        const {data: schedules} = await api.get<Array<Schedule>>(`/api/schedules/service/${serviceId}`);
        return schedules;
    }

}