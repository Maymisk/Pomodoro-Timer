import { CodesandboxLogo, Play } from 'phosphor-react';
import {
	Colon, CountdownContainer,
	FormContainer, HomeContainer, MinutesAmountInput, StartTimerButton,
	TaskInput
} from './styles';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';

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
	startDate: Date;
}

export function Home() {
	const [cycles, setCycles] = useState<ICycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountOfSecondsPassed, setAmountOfSecondsPassed] = useState(0);

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

	useEffect(() => {
		let interval: number;
		
		if (activeCycle) {
			interval = setInterval(() => {
				setAmountOfSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
			}, 1000)
		}

		return () => {
			clearInterval(interval)
		}
	}, [activeCycle])


	function handleFormSubmission({ task, minutesAmount }: NewCycleFormData) {
		const newCycle: ICycle = {
			id: String(new Date().getTime()),
			task,
			minutesAmount,
			startDate: new Date()
		};

		setCycles(prevState => [...prevState, newCycle]);
		setActiveCycleId(newCycle.id);
		setAmountOfSecondsPassed(0)

		reset();
	}

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle
		? totalSeconds - amountOfSecondsPassed
		: 0;

	const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
	const seconds = String(currentSeconds % 60).padStart(2, '0');

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`
		}
	}, [minutes, seconds, activeCycle])

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
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Colon>:</Colon>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

				<StartTimerButton disabled={!formCanBeSubmitted} type="submit">
					<Play size={24} />
					Começar
				</StartTimerButton>
			</form>
		</HomeContainer>
	);
}
