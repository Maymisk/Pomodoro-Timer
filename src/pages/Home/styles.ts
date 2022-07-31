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

		gap: 3.5rem;
	}
`;

export const BaseTimerButton = styled.button`
	width: 100%;

	border: 0;
	border-radius: 8px;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;

	font-weight: bold;

	padding: 1rem;

	color: ${props => props.theme['gray-100']};

	transition: background-color 0.3s;

	&:disabled {
		opacity: 0.7;

		cursor: not-allowed;
	}
`;

export const StartTimerButton = styled(BaseTimerButton)`
	background: ${props => props.theme['green-500']};

	&:not(:disabled):hover {
		background: ${props => props.theme['green-700']};
	}
`;

export const InterruptTimerButton = styled(BaseTimerButton)`
	background: ${props => props.theme['red-500']};

	&:not(:disabled):hover {
		background: ${props => props.theme['red-700']};
	}
`;
