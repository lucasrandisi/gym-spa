export type Pageable<T> = {
	content: Array<T>;
	totalPages: number;
	totalElements: number;
	last: boolean;
	first: boolean;
	size: number;
	number: number;
	empty: boolean;
};
