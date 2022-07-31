import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { useCycles } from '../../../../contexts/CyclesContext';
import { Colon, CountdownContainer } from './styles';

export function TimerCountdown() {
	const [amountOfSecondsPassed, setAmountOfSecondsPassed] = useState(0);

	const { activeCycle, finishActiveCycle } = useCycles();

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle
		? totalSeconds - amountOfSecondsPassed
		: 0;

	const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
	const seconds = String(currentSeconds % 60).padStart(2, '0');

	// makes the timer run
	useEffect(() => {
		let interval: number;

		if (activeCycle) {
			interval = setInterval(() => {
				const timeDifference = differenceInSeconds(
					new Date(),
					activeCycle.startDate
				);

				if (timeDifference >= totalSeconds) {
					finishActiveCycle();
				}

				setAmountOfSecondsPassed(timeDifference);
			}, 1000);
		}

		return () => {
			setAmountOfSecondsPassed(0);
			clearInterval(interval);
		};
	}, [activeCycle, finishActiveCycle]);

	// changes the title
	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		} else {
			document.title = 'Pomodoro Timer';
		}
	}, [minutes, seconds, activeCycle]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Colon>:</Colon>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
}
