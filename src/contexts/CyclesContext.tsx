import { createContext, ReactNode, useContext, useState } from 'react';

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

interface ICycle {
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
	const [cycles, setCycles] = useState<ICycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	function createCycle({ task, minutesAmount }: CreateCycleProps) {
		const newCycle: ICycle = {
			id: String(new Date().getTime()),
			task,
			minutesAmount,
			startDate: new Date(),
		};

		setCycles(prevState => [...prevState, newCycle]);
		setActiveCycleId(newCycle.id);
	}

	function interruptActiveCycle() {
		setCycles(prevState => {
			return prevState.map(cycle => {
				if (cycle.id === activeCycleId) {
					return {
						...cycle,
						interruptionDate: new Date(),
					};
				}

				return cycle;
			});
		});

		setActiveCycleId(null);
	}

	function finishActiveCycle() {
		setCycles(prevState => {
			return prevState.map(cycle => {
				if (cycle.id === activeCycleId) {
					return {
						...cycle,
						completionDate: new Date(),
					};
				}

				return cycle;
			});
		});

		setActiveCycleId(null);
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
