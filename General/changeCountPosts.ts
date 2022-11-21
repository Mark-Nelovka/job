import { IDataItems } from "../interfaces/dataItems";
import addNewKeys from "./addNewKeys";
import getDateCreatePost from "./getDateCreatePost";

export default function changeCountPosts(result: IDataItems[]) {
    const data: IDataItems[] = [];
    const itemsWithNewKeys = addNewKeys(result);
    const allItemsWithUpdateDate = getDateCreatePost(itemsWithNewKeys);
     for (let i = 0; i < allItemsWithUpdateDate.length * 5; i += 1) {
        allItemsWithUpdateDate.map((el) => {
          if (data.length === allItemsWithUpdateDate.length * 5) {
            return;
          }
          data.push(el);
        });
      }
    return data;
}