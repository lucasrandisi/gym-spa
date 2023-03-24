/* eslint-disable react/jsx-props-no-spreading */
import React, { useId } from "react";
import type { RadioGroupProps, RadioProps } from "@react-types/radio";
import {
	useRadioGroup,
	useRadio,
	VisuallyHidden,
	useFocusRing,
	mergeProps,
} from "react-aria";
import { useRadioGroupState } from "react-stately";
import styled from "styled-components";
// import { CheckCircleIcon } from "@heroicons/react/solid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CardContext = React.createContext(null);

interface CardGroupProps extends RadioGroupProps {
	label: String;
	children: React.ReactNode;
}

export function CardGroup(props: CardGroupProps) {
	const { children, label } = props;
	const state = useRadioGroupState(props);
	const { radioGroupProps, labelProps } = useRadioGroup(props, state);

	return (
		<div {...radioGroupProps}>
			<h2 {...labelProps}>{label}</h2>
			<CardContext.Provider value={state}>{children}</CardContext.Provider>
		</div>
	);
}

interface StyledCardProps {
	isSelected: boolean;
	isFocusVisible: boolean;
}

const StyledCard = styled.label<StyledCardProps>`
	display: block;
	padding: ${props => (props.isSelected || props.isFocusVisible ? "19px" : "20px")};
	margin: 8px 0;
	border: 1px solid;
	border-color: ${props =>
		props.isSelected || props.isFocusVisible ? "dodgerblue" : "#ddd"};
	border-width: ${props => (props.isSelected || props.isFocusVisible ? "2px" : "1px")};
	border-radius: 8px;
	box-shadow: ${props =>
		props.isFocusVisible ? "0 0 0 4px rgba(30, 144, 255, 0.3)" : "0 2px 8px #eee"};
	user-select: none;
	background: ${props => (props.isSelected ? "rgba(30, 144, 255, 0.08)" : "white")};
	position: relative;

	&:active {
		border-color: ${props => (props.isSelected || props.isFocusVisible ? "" : "#bbb")};
	}
`;

const Title = styled.div`
	font-weight: bold;
	margin-bottom: 5px;
`;

const Description = styled.div`
	font-size: small;
	color: #555;
`;

const Check = styled(CheckCircleIcon)`
	position: absolute;
	top: 8px;
	right: 8px;
	width: 20px;
	color: dodgerblue;
`;

interface CardProps extends RadioProps {
	title: String;
}

export function Card(props: CardProps) {
	const { title, children } = props;
	const state = React.useContext(CardContext);
	const ref = React.useRef(null);
	const { inputProps } = useRadio(props, state, ref);
	const { focusProps, isFocusVisible } = useFocusRing();
	const isSelected = state.selectedValue === props.value;

	// Label the hidden radio by the title, and
	// assign the description using aria-describedby.
	// This improves announcements.
	const titleId = useId();
	const descriptionId = useId();

	return (
		<StyledCard isFocusVisible={isFocusVisible} isSelected={isSelected}>
			<VisuallyHidden>
				<input
					{...mergeProps(inputProps, focusProps)}
					ref={ref}
					aria-labelledby={titleId}
					aria-describedby={descriptionId}
				/>
			</VisuallyHidden>
			<Title id={titleId}>{title}</Title>
			<Description id={descriptionId}>{children}</Description>
			{isSelected && <Check />}
		</StyledCard>
	);
}
