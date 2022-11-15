import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  changeRating: ({ id, title }: propsItem) => void;
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
    const d: IStarState[] = JSON.parse(localStorage.getItem("rating")!)
      ? JSON.parse(localStorage.getItem("rating")!)
      : [];
    setActiveStar(d);
  }, []);

  const simulateFetchData = async (username: IDataItems[]) => {};

  const testFunc = (q: IDataItems[]) => {
    // console.log("object");
  };

  const changeData = async ({ data }: IData) => {
    const qwe = Promise.resolve(data);
    qwe
      .then((res) => {
        const q: IDataItems[] = [];
        let getDatePosted = "1";
        const dateNow = new Date();
        const asd = res.map((item) => {
          const dateCreatePost = new Date(item.createdAt);
          const getYear = dateNow.getFullYear() - dateCreatePost.getFullYear();
          if (getYear > 0) {
            // q.push({ ...item, createdAt: String(getYear) + " years" });
            return { ...item, createdAt: String(getYear) + " years" };
          }
          // if (getYear === 0) {
          //   const getMonth = dateNow.getMonth() - dateCreatePost.getMonth();
          //   return { ...item, createdAt: String(getMonth) + " month" };
          // }
          // return item;
          return { ...item, createdAt: getYear + " years" };
        });
        // console.log(q);
        return asd;
      })
      .then((result) => {
        // console.log("res");
        // setData(result);
        return result;
      });
    // const qwe = await testFunc(data);
    // console.log(q);
    // setData(q);
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
