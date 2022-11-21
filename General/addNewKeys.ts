import { IDataItems } from "../interfaces/dataItems";

export default function addNewKeys(result: IDataItems[]) {
      const addNewKeys = result.map((item: IDataItems) => {
        return { ...item, save: false, rating: "0" };
      });
    return addNewKeys;
}