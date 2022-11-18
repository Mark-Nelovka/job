import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IDataItems, IData } from "../interfaces/dataItems";
import { authContextType, IStarState, propsItem } from "../interfaces/context";

export type Props = {
  children: ReactNode;
};

const authContextDefaultValues: authContextType = {
  items: [],
  changeData: () => [],
  activeStar: [],
  changeRating: () => [],
};

const Context = createContext<authContextType>(authContextDefaultValues);

export function ThemeProvider({ children }: Props) {
  const [items, setData] = useState<IDataItems[]>();
  const [activeStar, setActiveStar] = useState<IStarState[]>([]);

  useEffect(() => {
    const localStars: IStarState[] = JSON.parse(localStorage.getItem("rating")!)
      ? JSON.parse(localStorage.getItem("rating")!)
      : [];
    setActiveStar(localStars);
  }, []);

  const changeData = async ({ data }: IData) => {
    setData(data);
  };

  const changeRating = ({ id, title }: propsItem) => {
    setActiveStar((prevState): IStarState[] => {
      if (prevState.length === 0) {
        localStorage.setItem("rating", JSON.stringify([{ id, title }]));
        return [
          {
            id,
            title,
          },
        ];
      }
      const rating: IDataItems[] = JSON.parse(
        localStorage.getItem("rating")!
      ).filter((el: IDataItems) => el.id !== id);
      localStorage.setItem(
        "rating",
        JSON.stringify([...rating, { id, title }])
      );
      return [
        ...prevState.filter((el) => el.id !== id),
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
    changeRating,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useThemeContext() {
  return useContext(Context);
}
