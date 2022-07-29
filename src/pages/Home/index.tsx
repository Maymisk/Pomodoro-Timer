import { Play } from 'phosphor-react';
import {
	HomeContainer,
	CountdownContainer,
	FormContainer,
	Colon,
} from './styles';

export function Home() {
	return (
		<HomeContainer>
			<form action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalhar com</label>
					<input type="text" id="task" />

					<label htmlFor="minutesAmount">durante</label>
					<input type="number" id="minutesAmount" />

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Colon>:</Colon>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<button type="submit">
					<Play />
					Começar
				</button>
			</form>
		</HomeContainer>
	);
}
