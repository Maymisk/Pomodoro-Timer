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

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { register, handleSubmit, reset, watch, formState } =
		useForm<NewCycleFormData>({
			resolver: zodResolver(newCycleFormValidationSchema),
			defaultValues: {
				task: '',
				minutesAmount: 5,
			},
		});

	const task = watch('task');
	const formCanBeSubmitted = !!task;

	function handleFormSubmission(data: NewCycleFormData) {
		console.log(data);

		reset();
	}

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleFormSubmission)}>
				<FormContainer>
					<label htmlFor="task">Vou trabalhar com</label>
					<TaskInput
						type="text"
						id="task"
						placeholder="Dê um nome para o seu projeto"
						{...register('task')}
					/>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						min={5}
						max={60}
						step={5}
						{...register('minutesAmount', {
							valueAsNumber: true,
						})}
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

				<StartTimerButton disabled={!formCanBeSubmitted} type="submit">
					<Play size={24} />
					Começar
				</StartTimerButton>
			</form>
		</HomeContainer>
	);
}
