import { IDataItems } from "../interfaces/dataItems";

export default function getDateCreatePost(data: IDataItems[]) {
    const timeForSort: string[] = [];
  const dateNow = new Date();
   
  const itemsChanged = data.map((element) => {
        const formatingDate = new Date(element.createdAt).getTime().toString();
        timeForSort.push(formatingDate);
        return {...element, createdAt: formatingDate}
    })

   const sortedItems = timeForSort.sort((a, b) => +b - +a).map((el) => {
       const findItemDate = itemsChanged.find(e => e.createdAt === el)!;
       const date = new Date(+findItemDate.createdAt).toJSON();
       return {...findItemDate, createdAt: date}
   }).map((item) => {
        const dateCreatePost = new Date(item.createdAt);
        const getYear = dateNow.getFullYear() - dateCreatePost.getFullYear();
        if (getYear > 0) {
          return { ...item, createdAt: `Posted ${getYear} years ago` };
        }

        const getMonth = dateNow.getMonth() - dateCreatePost.getMonth();
        if (getMonth > 0) {
          return { ...item, createdAt: `Posted ${getMonth} months ago` };
        }

        const getDays = dateNow.getDate() - dateCreatePost.getDate();
        if (getDays > 0) {
          return { ...item, createdAt: `Posted ${getDays} days ago` };
        }

        return { ...item, createdAt: "Posted today" };
       });

      return sortedItems;
}