import { InferGetServerSidePropsType } from "next";
import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../state";
import Pagination from "../сomponents/pagination";
import Loader from "../сomponents/loader";
// import Joblist from "../сomponents/jobList";
import { IDataItems } from "../interfaces/dataItems";
import saveJob from "../General/saveJob";
import getJobWithLocalStorage from "../General/localStorage";
import changeCountPosts from "../General/changeCountPosts";
import LocalIcon from "../assets/images/Location-icon.svg";
import SaveIcon from "../assets/images/Save-icon.svg";
import Link from "next/link";

export default function Home({
  errorCode,
  result,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [first, setFirst] = useState<number>(0);
  const [last, setLast] = useState<number>(5);
  const [loading, setLoading] = useState(false);

  const allItems = useGlobalState("allItems");

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const getLocal = getJobWithLocalStorage();
    if (getLocal && allItems[0].length === 0) {
      setGlobalState("allItems", getLocal);
      setLoading(false);
      return;
    }

    if (errorCode === 200 && allItems[0].length === 0) {
      const data = changeCountPosts(result);
      setGlobalState("allItems", data);
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [result, errorCode, allItems]);

  const addRating = (event: React.MouseEvent) => {
    const { title } = event.target as HTMLLabelElement;
    const { id } = event.currentTarget as HTMLDivElement;
    const changeRating = allItems[0].map((item) => {
      if (item.id === id) {
        return { ...item, rating: title };
      }
      return item;
    });
    localStorage.setItem("changedAttributes", JSON.stringify(changeRating));
    setGlobalState("allItems", changeRating);
  };

  const changeSave = (event: React.MouseEvent) => {
    const { id } = event.currentTarget as HTMLButtonElement;
    const itemsWithSave = saveJob({ id, allItems });
    setGlobalState("allItems", itemsWithSave);
  };

  const getItemsForNewPage = (id: number) => {
    const lastIndex = id * 5;
    const firstIndex = lastIndex - 5;
    if (id === result.length) {
      setFirst(firstIndex);
      setLast(lastIndex);
      return;
    }
    if (lastIndex > allItems.length) {
      setFirst(firstIndex);
      setLast(lastIndex);
      return;
    }
    setFirst(firstIndex);
    setLast(lastIndex);
  };

  return (
    <main>
      {errorCode !== 200 ? (
        <Error statusCode={errorCode} />
      ) : (
        <>
          {loading && <Loader />}
          <section className="section">
            {allItems[0].length > 0 && (
              <div className="job-container">
                <ul className="job-list">
                  {allItems[0]
                    .slice(first, last)
                    .map(
                      ({
                        id,
                        pictures,
                        title,
                        name,
                        address,
                        createdAt,
                        save,
                        rating,
                      }: IDataItems) => {
                        return (
                          <li key={id} className="job-list__item">
                            <div className="job-list__image-container">
                              <Image
                                src={pictures[0]}
                                alt="img"
                                width={85}
                                height={85}
                              />
                            </div>
                            <div className="job-list__info-container">
                              <div className="star-rating-sm">
                                <div
                                  onClick={addRating}
                                  id={String(id)}
                                  className="star-rating__wrap"
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
                                      rating === "5"
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
                                      rating >= "4"
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
                                      rating >= "3"
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
                                      rating >= "2"
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
                                      rating >= "1"
                                        ? "star-rating__ico--active"
                                        : "star-rating__ico"
                                    }
                                    htmlFor="star-rating-1"
                                    title="1"
                                    id={String(id)}
                                  ></label>
                                </div>
                                <div className="job-list__save-container-sm">
                                  <p>{createdAt}</p>
                                </div>
                              </div>
                              <div className="job-list__title-container">
                                <Link href={`/${id}`}>{title}</Link>
                                <div>
                                  <span>{name}</span>
                                  <span>{address}</span>
                                </div>
                                <p className="job-list__location-container">
                                  <span>
                                    <LocalIcon
                                      width={13}
                                      height={18}
                                      alt="location icon"
                                    />
                                  </span>
                                  <span>Vienna, Austria</span>
                                </p>
                              </div>
                            </div>
                            <div className="star-rating">
                              <div
                                onClick={addRating}
                                id={String(id)}
                                className="star-rating__wrap"
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
                                    rating === "5"
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
                                    rating >= "4"
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
                                    rating >= "3"
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
                                    rating >= "2"
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
                                    rating >= "1"
                                      ? "star-rating__ico--active"
                                      : "star-rating__ico"
                                  }
                                  htmlFor="star-rating-1"
                                  title="1"
                                  id={String(id)}
                                ></label>
                              </div>
                            </div>
                            <div className="job-list__save-container">
                              <button onClick={changeSave} id={id}>
                                <SaveIcon
                                  width={16}
                                  height={20}
                                  alt="Save icon"
                                  className={
                                    save
                                      ? "job-list__save-icon--save"
                                      : "job-list__save-icon"
                                  }
                                />
                              </button>
                              <p>{createdAt}</p>
                            </div>
                          </li>
                        );
                      }
                    )}
                </ul>
                <Pagination getItem={(id: number) => getItemsForNewPage(id)} />
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.json-generator.com/templates/ZM1r0eic3XEy/data",
    {
      headers: {
        Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
      },
    }
  );
  const errorCode = res.ok ? 200 : res.status;
  const result = await res.json();

  return {
    props: { errorCode, result },
  };
}
