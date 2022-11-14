import Image from "next/image";
import { IDataItems } from "../../interfaces/dataItems";
import { useThemeContext } from "../../context/context";
import { useRouter } from "next/router";

export const Joblist = () => {
  const ctx = useThemeContext();
  const router = useRouter();

  const addRating = (event: React.MouseEvent) => {
    const { title } = event.target as HTMLLabelElement;
    const { id } = event.currentTarget as HTMLDivElement;
    ctx.changeRating({ id, title });
  };

  return (
    <section className="section">
      <ul className="job-list">
        {ctx.items &&
          ctx.items.map(
            ({
              id,
              pictures,
              title,
              name,
              address,
              location,
              benefits,
              phone,
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
                    <p>Vienna, Austria</p>
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
                </li>
              );
            }
          )}
      </ul>
    </section>
  );
};
