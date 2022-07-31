import { useFormContext } from 'react-hook-form';
import { useCycles } from '../../../../contexts/CyclesContext';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
	const { register } = useFormContext();
	const { activeCycle } = useCycles();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar com</label>
			<TaskInput
				type="text"
				id="task"
				placeholder="Dê um nome para o seu projeto"
				disabled={!!activeCycle}
				{...register('task')}
			/>

			<label htmlFor="minutesAmount">durante</label>
			<MinutesAmountInput
				type="number"
				id="minutesAmount"
				placeholder="00"
				min={5}
				step={5}
				disabled={!!activeCycle}
				{...register('minutesAmount', {
					valueAsNumber: true,
				})}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
}
