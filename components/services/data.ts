export const services = [
	{
		id: 1,
		name: "Gimnasio",
		description: "Gimnasio",
		type: "activity",
	},
	{
		id: 2,
		name: "Piscina",
		description: "Piscina",
		type: "activity",
	},
	{
		id: 3,
		name: "Spa",
		description: "Spa",
		type: "activity",
	},
	{
		id: 4,
		name: "Musculacion",
		type: "activity",
		description: "Musculacion",
	},
	{
		id: 5,
		name: "Zumba",
		description: "Zumba",
		type: "class",
	},
	{
		id: 6,
		name: "Yoga",
		description: "Yoga",
		type: "class",
	},
	{
		id: 7,
		name: "Crossfit",
		description: "Crossfit",
		type: "class",
	},
	{
		id: 8,
		name: "Pilates",
		description: "Pilates",
		type: "class",
	},
	{
		id: 9,
		name: "Tennis",
		description: "Tennis",
		type: "activity",
	},
	{
		id: 10,
		name: "Spinning",
		description: "Spinning",
		type: "class",
	},
	{
		id: 11,
		name: "Boxeo",
		description: "Boxeo",
		type: "class",
	},
	{
		id: 12,
		name: "Taekwondo",
		description: "Taekwondo",
		type: "class",
	},
	{
		id: 13,
		name: "Paquete 1",
		description: "Paquete 1",
		type: "package",
	},
];

export const services_locations = [
	{
		id: 1,
		service_id: 1,
		location_id: 1,
	},
	{
		id: 2,
		service_id: 2,
		location_id: 1,
	},
	{
		id: 3,
		service_id: 3,
		location_id: 1,
	},
	{
		id: 4,
		service_id: 4,
		location_id: 1,
	},
	{
		id: 5,
		service_id: 5,
		location_id: 1,
	},
	{
		id: 6,
		service_id: 6,
		location_id: 1,
	},
	{
		id: 7,
		service_id: 7,
		location_id: 1,
	},
	{
		id: 8,
		service_id: 8,
		location_id: 1,
	},
	{
		id: 9,
		service_id: 9,
		location_id: 1,
	},
	{
		id: 10,
		service_id: 10,
		location_id: 1,
	},
	{
		id: 11,
		service_id: 11,
		location_id: 1,
	},
	{
		id: 12,
		service_id: 12,
		location_id: 1,
	},
	{
		id: 13,
		service_id: 1,
		location_id: 2,
	},
	{
		id: 14,
		service_id: 2,
		location_id: 2,
	},
	{
		id: 15,
		service_id: 3,
		location_id: 2,
	},
	{
		id: 16,
		service_id: 4,
		location_id: 2,
	},
	{
		id: 17,
		service_id: 5,
		location_id: 2,
	},
	{
		id: 18,
		service_id: 6,
		location_id: 2,
	},
	{
		id: 19,
		service_id: 7,
		location_id: 2,
	},
	{
		id: 20,
		service_id: 8,
		location_id: 2,
	},
	{
		id: 21,
		service_id: 9,
		location_id: 2,
	},
];

export const services_prices = [
	{
		id: 1,
		service_id: 1,
		price: 100,
		currency: "ARS",
		from: "2020-01-01",
	},
	{
		id: 2,
		service_id: 2,
		price: 100,
		currency: "ARS",
		from: "2020-01-01",
	},
	{
		id: 3,
		service_id: 3,
		price: 100,
		currency: "ARS",
		from: "2020-01-01",
	},
];

export const services_packages = [
	{
		id: 1,
		service_id: 1,
		package_id: 13,
		limit: 1,
	},
	{
		id: 2,
		service_id: 2,
		package_id: 13,
	},
	{
		id: 3,
		service_id: 3,
		package_id: 13,
	},
];

export const schedule = [
	{
		id: 1,
		services_locations_id: 1,
		day: 1,
		start: "08:00",
		end: "12:00",
		capacity: 10,
	},
	{
		id: 2,
		services_locations_id: 1,
		day: 1,
		start: "16:00",
		end: "20:00",
		capacity: 10,
	},
	{
		id: 3,
		services_locations_id: 1,
		day: 2,
		start: "08:00",
		end: "12:00",
		capacity: 10,
	},
	{
		id: 4,
		services_locations_id: 1,
		day: 2,
		start: "16:00",
		end: "20:00",
		capacity: 10,
	},
];

export const cancellation_policy = [
	{
		id: 1,
		name: "Cancelación 24hs",
		description: "Cancelación 24hs",
		hours: 24,
	},
	{
		id: 2,
		name: "Cancelación 48hs",
		description: "Cancelación 48hs",
		hours: 48,
	},
];

export const service_cancellation_policies = [
	{
		id: 1,
		service_id: 1,
		cancellation_policy_id: 1,
	},
	{
		id: 2,
		service_id: 2,
		cancellation_policy_id: 1,
	},
];

export const enrollments = [
	{
		id: 1,
		schedule_id: 1,
		user_id: 1,
		date: "2020-01-01",
		cancellationDate: null,
		status: "confirmed",
	},
	{
		id: 2,
		schedule_id: 1,
		user_id: 2,
		date: "2020-01-01",
		cancellationDate: "2020-01-01",
		status: "cancelled",
	},
];

