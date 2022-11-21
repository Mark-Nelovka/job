import { createGlobalState } from "react-hooks-global-state";
import {IState} from "../interfaces/state";

export const initialState: IState = {
  allItems: [],
};

const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { setGlobalState, useGlobalState };