import { ActionTypes, IAction } from './actions';
import { ICycle } from '../../contexts/CyclesContext';

interface ICycleState {
	cycles: ICycle[];
	activeCycleId: string | null;
}

export function cyclesReducer(
	state: ICycleState,
	action: IAction
): ICycleState {
	if (action.type === ActionTypes.CREATE_CYCLE) {
		return {
			cycles: [...state.cycles, action.payload.newCycle],
			activeCycleId: action.payload.newCycle.id,
		};
	}

	if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
		const newCyclesArray = state.cycles.map(cycle => {
			if (cycle.id === state.activeCycleId) {
				return {
					...cycle,
					interruptionDate: new Date(),
				};
			}

			return cycle;
		});

		return {
			cycles: newCyclesArray,
			activeCycleId: null,
		};
	}

	if (action.type === ActionTypes.FINISH_CYCLE) {
		const newCyclesArray = state.cycles.map(cycle => {
			if (cycle.id === state.activeCycleId) {
				return {
					...cycle,
					completionDate: new Date(),
				};
			}

			return cycle;
		});

		return {
			cycles: newCyclesArray,
			activeCycleId: null,
		};
	}

	return state;
}
