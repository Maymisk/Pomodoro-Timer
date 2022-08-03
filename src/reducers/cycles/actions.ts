import { ICycle } from '../../contexts/CyclesContext';

export enum ActionTypes {
	CREATE_CYCLE = 'ADD_NEW_CYCLE',
	INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
	FINISH_CYCLE = 'FINISH_CYCLE',
}

export interface IAction {
	type: ActionTypes;
	payload?: any;
}

export function createNewCycleAction(newCycle: ICycle): IAction {
	return {
		type: ActionTypes.CREATE_CYCLE,
		payload: {
			newCycle,
		},
	};
}

export function interruptCycleAction(): IAction {
	return {
		type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
	};
}

export function finishCycleAction(): IAction {
	return {
		type: ActionTypes.FINISH_CYCLE,
	};
}
