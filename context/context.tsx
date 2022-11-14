import React, { createContext, ReactNode, useContext, useState } from "react";
import { IDataItems, IData } from "../interfaces/dataItems";

type Props = {
  children: ReactNode;
};

interface IStarState {
  id: string;
  title: string;
}

type propsItem = {
  id: string;
  title: string;
};

type authContextType = {
  items: IDataItems[] | undefined;
  changeData: (data: IData) => void;
  activeStar: IStarState[];
  changeActiveStar: ({ id, title }: propsItem) => void;
};

const defaultStarState: IStarState[] = [
  {
    id: "2",
    title: "2",
  },
];

const authContextDefaultValues: authContextType = {
  items: [],
  changeData: () => [],
  activeStar: [
    {
      id: "2",
      title: "2",
    },
  ],
  changeActiveStar: () => [],
};

const Context = createContext<authContextType>(authContextDefaultValues);

export function ThemeProvider({ children }: Props) {
  const [items, setData] = useState<IDataItems[]>();
  const [activeStar, setActiveStar] = useState<IStarState[]>(defaultStarState);

  const changeData = ({ data }: IData) => {
    setData(data);
  };

  const changeActiveStar = ({ id, title }: propsItem) => {
    setActiveStar((prevState): IStarState[] => {
      if (prevState.length === 0) {
        return [
          {
            id,
            title,
          },
        ];
      }
      return [
        ...prevState,
        {
          id,
          title,
        },
      ];
    });
  };

  const value = {
    items,
    changeData,
    activeStar,
    changeActiveStar,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useThemeContext() {
  return useContext(Context);
}
