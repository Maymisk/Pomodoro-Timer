import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import {
	createNewCycleAction,
	finishCycleAction,
	interruptCycleAction,
} from '../reducers/cycles/actions';
import { cyclesReducer } from '../reducers/cycles/reducer';

interface ICyclesContextData {
	activeCycle: ICycle | undefined;
	cycles: ICycle[];
	createCycle(data: CreateCycleProps): void;
	interruptActiveCycle(): void;
	finishActiveCycle(): void;
}

interface ICyclesProviderProps {
	children: ReactNode;
}

export interface ICycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptionDate?: Date;
	completionDate?: Date;
}

type CreateCycleProps = Pick<ICycle, 'task' | 'minutesAmount'>;

const CyclesContext = createContext({} as ICyclesContextData);

export function CyclesContextProvider({ children }: ICyclesProviderProps) {
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null,
		},
		() => {
			const cyclesState = localStorage.getItem(
				'@PomodoroTimer:cyclesState'
			);

			if (cyclesState) {
				return JSON.parse(cyclesState);
			}

			return {
				cycles: [],
				activeCycleId: null,
			};
		}
	);

	useEffect(() => {
		const stringifiedState = JSON.stringify(cyclesState);

		localStorage.setItem('@PomodoroTimer:cyclesState', stringifiedState);
	}, [cyclesState]);

	const { activeCycleId, cycles } = cyclesState;

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	function createCycle({ task, minutesAmount }: CreateCycleProps) {
		const newCycle: ICycle = {
			id: String(new Date().getTime()),
			task,
			minutesAmount,
			startDate: new Date(),
		};

		dispatch(createNewCycleAction(newCycle));
	}

	function interruptActiveCycle() {
		dispatch(interruptCycleAction());
	}

	function finishActiveCycle() {
		dispatch(finishCycleAction());
	}

	return (
		<CyclesContext.Provider
			value={{
				activeCycle,
				cycles,
				createCycle,
				interruptActiveCycle,
				finishActiveCycle,
			}}
		>
			{children}
		</CyclesContext.Provider>
	);
}

export function useCycles() {
	return useContext(CyclesContext);
}
