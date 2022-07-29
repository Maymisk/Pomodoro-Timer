import styled from 'styled-components';

export const HomeContainer = styled.main`
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 3.5rem;
	}
`;

export const FormContainer = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;

	color: ${props => props.theme['gray-100']};

	font-size: 1.125rem;
	font-weight: bold;
`;

const BaseInput = styled.input`
	height: 2.5rem;

	border: 0;
	border-bottom: 2px solid ${props => props.theme['gray-500']};

	font-weight: bold;
	font-size: 1.125rem;

	padding: 0 0.5rem;

	color: ${props => props.theme['gray-100']};
	background: transparent;

	&::placeholder {
		color: ${props => props.theme['gray-500']};
	}

	&:focus {
		box-shadow: none;
		border-color: ${props => props.theme['green-500']};
	}
`;

export const TaskInput = styled(BaseInput)`
	flex: 1;
`;

export const MinutesAmountInput = styled(BaseInput)`
	width: 4rem;
`;

export const CountdownContainer = styled.div`
	font-family: 'Roboto Mono', monospace;
	font-size: 10rem;

	line-height: 8rem;

	display: flex;
	gap: 1rem;

	color: ${props => props.theme['gray-100']};

	span {
		background: ${props => props.theme['gray-700']};

		padding: 2rem 1rem;

		border-radius: 8px;
	}
`;

export const Colon = styled.div`
	width: 4rem;

	padding: 2rem 0;

	color: ${props => props.theme['green-500']};

	font-family: 'Roboto', sans-serif;

	text-align: center;
`;

export const StartTimerButton = styled.button`
	width: 100%;

	border: 0;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	font-weight: bold;

	padding: 1rem;

	background: ${props => props.theme['green-500']};
	color: ${props => props.theme['gray-100']};

	transition: background-color 0.3s;

	&:disabled {
		opacity: 0.7;

		cursor: not-allowed;
	}

	&:not(:disabled):hover {
		background: ${props => props.theme['green-700']};
	}
`;
