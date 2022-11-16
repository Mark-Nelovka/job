import Image from "next/image";
import LocalIcon from "./Location-icon.svg";
import SaveIcon from "../../assets/images/Save-icon.svg";
import { IDataItems } from "../../interfaces/dataItems";
import { useThemeContext } from "../../context/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "../pagination";
import getDateCreatePost from "../../General/getDateCreatePost";

interface IGetNewItem {
  pageActive: number;
  ariaLabel: string;
}

export const Joblist = () => {
  const [allItems, setAllItems] = useState<IDataItems[]>([]);
  const [items, setItems] = useState<IDataItems[]>([]);

  const ctx = useThemeContext();
  const router = useRouter();

  const addRating = (event: React.MouseEvent) => {
    const { title } = event.target as HTMLLabelElement;
    const { id } = event.currentTarget as HTMLDivElement;
    ctx.changeRating({ id, title });
  };

  useEffect(() => {
    if (ctx.items) {
      const allItemsWithUpdateDate = getDateCreatePost(ctx.items);
      setAllItems(allItemsWithUpdateDate);
      setItems(allItemsWithUpdateDate.slice(0, 5));
    }
  }, [ctx.items]);

  const getItemsForNewPage = (id: number, ariaLabel?: string) => {
    const lastContentIndex = id * 5;
    const firstContentIndex = lastContentIndex - 5;
    if (lastContentIndex > allItems.length) {
      setAllItems(allItems.concat(allItems));
      setItems(
        allItems.concat(allItems).slice(firstContentIndex, lastContentIndex)
      );
      return;
    }
    setItems(allItems.slice(firstContentIndex, lastContentIndex));
  };

  return (
    <section className="section">
      <ul className="job-list">
        {items.length > 0 &&
          items.map(
            ({
              id,
              pictures,
              title,
              name,
              address,
              location,
              benefits,
              phone,
              createdAt,
            }: IDataItems) => {
              return (
                <li key={id} className="job-list__item">
                  <div className="job-list__image-container">
                    <Image
                      src={pictures[0]}
                      alt="img"
                      width={85}
                      height={85}
                      priority
                    />
                  </div>
                  <div
                    onClick={() => router.push("/detailed-job")}
                    className="job-list__title-container"
                  >
                    <p>{title}</p>
                    <div>
                      <span>{name}</span>
                      <span>{address}</span>
                    </div>
                    <p className="job-list__location-container">
                      <span>
                        <LocalIcon width={13} height={18} alt="location icon" />
                      </span>
                      <span>Vienna, Austria</span>
                    </p>
                  </div>
                  <div className="star-rating">
                    <div
                      onClick={addRating}
                      id={String(id)}
                      className="star-rating__wrap after:table after:clear-both"
                    >
                      <input
                        className="star-rating__input"
                        type="radio"
                        name="rating"
                        value="5"
                        id={String(id)}
                      />
                      <label
                        className={
                          ctx.activeStar.find(
                            (el) => el.id === String(id) && el.title === "5"
                          )
                            ? "star-rating__ico--active"
                            : "star-rating__ico"
                        }
                        htmlFor={String(id)}
                        title="5"
                        id={String(id)}
                      ></label>
                      <input
                        className="star-rating__input"
                        type="radio"
                        name="rating"
                        value="4"
                        id={String(id)}
                      />

                      <label
                        className={
                          ctx.activeStar.find(
                            (el) => el.id === String(id) && el.title >= "4"
                          )
                            ? "star-rating__ico--active"
                            : "star-rating__ico"
                        }
                        htmlFor={String(id)}
                        title="4"
                        id={String(id)}
                      ></label>

                      <input
                        className="star-rating__input"
                        id={String(id)}
                        type="radio"
                        name="rating"
                        value="3"
                      />
                      <label
                        className={
                          ctx.activeStar.find(
                            (el) => el.id === String(id) && el.title >= "3"
                          )
                            ? "star-rating__ico--active"
                            : "star-rating__ico"
                        }
                        htmlFor={String(id)}
                        title="3"
                        id={String(id)}
                      ></label>
                      <input
                        className="star-rating__input"
                        id={String(id)}
                        type="radio"
                        name="rating"
                        value="2"
                      />
                      <label
                        className={
                          ctx.activeStar.find(
                            (el) => el.id === String(id) && el.title >= "2"
                          )
                            ? "star-rating__ico--active"
                            : "star-rating__ico"
                        }
                        htmlFor={String(id)}
                        title="2"
                      ></label>
                      <input
                        className="star-rating__input"
                        id={String(id)}
                        type="radio"
                        name="rating"
                        value="1"
                      />
                      <label
                        className={
                          ctx.activeStar.find(
                            (el) => el.id === String(id) && el.title >= "1"
                          )
                            ? "star-rating__ico--active"
                            : "star-rating__ico"
                        }
                        htmlFor="star-rating-1"
                        title="1"
                        id={String(id)}
                      ></label>
                    </div>
                  </div>
                  <div className="job-list__save--container">
                    <span>
                      <SaveIcon
                        width={16}
                        height={20}
                        alt="Save icon"
                        className="job-list__save-icon"
                      />
                    </span>
                    <p>{createdAt}</p>
                  </div>
                </li>
              );
            }
          )}
      </ul>

      <Pagination
        getItem={(id: number, ariaLabel?: string) =>
          getItemsForNewPage(id, ariaLabel)
        }
      />
    </section>
  );
};
