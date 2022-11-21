import { IDataItems } from "../interfaces/dataItems";

export default function saveJob({id, allItems}: any) {
    const changeSaveKey: IDataItems[] = allItems[0].map((el: IDataItems) => {
      if (el.id === id && el.save) {
        return { ...el, save: false };
      }
      if (el.id === id && !el.save) {
        return { ...el, save: true };
      }
      return el;
    });
    localStorage.setItem("changedAttributes", JSON.stringify(changeSaveKey));

    return changeSaveKey;
  };