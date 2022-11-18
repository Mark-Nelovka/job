import { IDataItems, IData } from "./dataItems";

export interface IStarState {
  id: string;
  title: string;
}

export interface propsItem {
  id: string;
  title: string;
};

export type authContextType = {
  items: IDataItems[] | undefined;
  changeData: (data: IData) => void;
  activeStar: IStarState[];
  changeRating: ({ id, title }: propsItem) => void;
};