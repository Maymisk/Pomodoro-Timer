import { Play } from 'phosphor-react';
import {
	HomeContainer,
	CountdownContainer,
	FormContainer,
	Colon,
	StartTimerButton,
	TaskInput,
	MinutesAmountInput,
} from './styles';

export function Home() {
	return (
		<HomeContainer>
			<form action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalhar com</label>
					<TaskInput
						type="text"
						id="task"
						placeholder="Dê um nome para o seu projeto"
					/>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						min={5}
						max={60}
						step={5}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Colon>:</Colon>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartTimerButton type="submit">
					<Play size={24} />
					Começar
				</StartTimerButton>
			</form>
		</HomeContainer>
	);
}
