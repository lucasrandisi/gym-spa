import {
	Autocomplete,
	AutocompleteRenderInputParams,
	CircularProgress,
	TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "hooks/useDebounce";
import { User } from "models/user";
import React from "react";
import UserService from "services/user.service";

export type UserSelectorProps = {
	disabled?: boolean;
	value: User | null;
	// eslint-disable-next-line no-unused-vars
	onChange: (user: User | null) => {};
	label: String;
};

const UserSelector = ({ disabled, value, onChange, label }: UserSelectorProps) => {
	const [search, setSearch] = React.useState("");
	const debouncedSearch = useDebounce(search, 400);

	const { isFetching, data } = useQuery(
		["search-user", { debouncedSearch }],
		() => UserService.searchByName(debouncedSearch),
		{
			initialData: [],
			enabled: debouncedSearch.trim().length > 3,
		}
	);

	function handleSearchChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		if (event.target.value !== null && event.target.value.trim() !== "") {
			setSearch(event.target.value.trim());
		}
	}

	const getOptionLabel = (option: User): string => option.name;

	const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => (
		<TextField
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...params}
			label={label}
			value={search}
			variant="outlined"
			onChange={e => handleSearchChange(e)}
			InputProps={{
				...params.InputProps,
				endAdornment: (
					<>
						{isFetching ? <CircularProgress color="inherit" size={20} /> : null}
						{params.InputProps.endAdornment}
					</>
				),
			}}
			sx={{ mb: 2 }}
		/>
	);

	return (
		<Autocomplete
			id="user-select"
			options={data}
			value={value}
			onChange={(_e, v) => onChange(v)}
			getOptionLabel={getOptionLabel}
			renderInput={renderInput}
			loading={isFetching}
			filterOptions={x => x}
			blurOnSelect
			autoHighlight
			disabled={disabled}
			sx={{ width: "25%", mr: 2 }}
		/>
	);
};

UserSelector.defaultProps = {
	disabled: false,
};

export default UserSelector;
