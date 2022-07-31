import { HandPalm, Play } from 'phosphor-react';
import {
	HomeContainer,
	InterruptTimerButton,
	StartTimerButton,
} from './styles';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useCycles } from '../../contexts/CyclesContext';
import { newCycleFormValidationSchema } from '../../validationSchemas/NewCycleForm';
import { NewCycleForm } from './components/NewCycleForm';
import { TimerCountdown } from './components/TimerCountdown';

type NewCycleFormData = {
	task: string;
	minutesAmount: number;
};

export function Home() {
	const { activeCycle, interruptActiveCycle, createCycle } = useCycles();

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 5,
		},
	});

	function handleFormSubmission(data: NewCycleFormData) {
		createCycle(data);
		reset();
	}

	const { handleSubmit, reset, watch } = newCycleForm;
	const task = watch('task');
	const formCanBeSubmitted = !!task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleFormSubmission)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>

				<TimerCountdown />

				{activeCycle ? (
					<InterruptTimerButton
						type="button"
						onClick={interruptActiveCycle}
					>
						<HandPalm size={24} />
						Interromper
					</InterruptTimerButton>
				) : (
					<StartTimerButton
						disabled={!formCanBeSubmitted}
						type="submit"
					>
						<Play size={24} />
						Começar
					</StartTimerButton>
				)}
			</form>
		</HomeContainer>
	);
}
