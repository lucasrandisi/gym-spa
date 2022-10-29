import { Payment } from "models/payment";
import { api } from "./api";

export default class PaymentService {
	static get = async (id: string) => api.get<Payment>(`/api/payments/${id}`);

	static getAll = async () => {
		const { data: payments } = await api.get<Array<Payment>>("/api/payments");
		return payments;
	};

	static async create(values: any) {
		const { data: payment } = await api.post<Payment>("/api/payments/pay", values);
		return payment;
	}

	static findAllByUser = async (id: Number) => {
		const { data: payments } = await api.get<Array<Payment>>(
			`/api/payments?user_id=${id}`
		);
		return payments;
	};
}
