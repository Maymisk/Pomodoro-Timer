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
import { useState } from 'react';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface ICycle {
	id: string;
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycles] = useState<ICycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const { register, handleSubmit, reset, watch } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5,
		},
	});

	const task = watch('task');
	const formCanBeSubmitted = !!task;

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	function handleFormSubmission({ task, minutesAmount }: NewCycleFormData) {
		const newCycle: ICycle = {
			id: String(new Date().getTime()),
			task,
			minutesAmount,
		};

		setCycles(prevState => [...prevState, newCycle]);
		setActiveCycleId(newCycle.id);

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
