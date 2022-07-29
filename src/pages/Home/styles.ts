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
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	flex-wrap: wrap;

	color: ${props => props.theme['gray-100']};

	font-size: 1.125rem;
	font-weight: bold;
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
