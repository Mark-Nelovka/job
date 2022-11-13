import Image from "next/image";
import { useEffect, useState } from "react";
import { IData, IDataItems } from "../../interfaces/dataItems";

export const Joblist = ({ data }: IData) => {
  const [first, setFirst] = useState("");
  const [valueStart, setValueStart] = useState("");

  const getStars = (event: React.MouseEvent) => {
    const { title } = event.target as HTMLLabelElement;
    const { id } = event.currentTarget as HTMLLIElement;
    // console.log(title);
    setFirst(id);
    setValueStart(title);
  };

  return (
    <section className="bg-[#E6E9F2] py-7 px-64">
      <ul>
        {data.map(
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
              <li
                key={id}
                className="bg-white mb-2 px-4 py-6 flex items-center"
                // onClick={getStars}
                // id={String(id)}
              >
                <div className="mr-6">
                  <Image
                    src={pictures[0]}
                    alt="img"
                    width={85}
                    height={85}
                    className="rounded-[50%] h-[85px]"
                    priority
                  />
                </div>
                <div className="flex items-start flex-col w-50">
                  <span>{title}</span>
                  <span>{name}</span>
                  <span>{phone}</span>
                </div>
                <div className="star-rating">
                  <div
                    onClick={getStars}
                    className="star-rating__wrap after:table after:clear-both"
                  >
                    <input
                      className="star-rating__input"
                      // id="star-rating-5"
                      type="radio"
                      name="rating"
                      value="5"
                      id={String(id)}
                    />
                    <label
                      className={
                        first === String(id) && valueStart === "5"
                          ? "star-rating__ico--active"
                          : "star-rating__ico"
                      }
                      htmlFor={String(id)}
                      title="5"
                    ></label>
                    <input
                      className="star-rating__input"
                      // id="star-rating-4"
                      // id={String(id)}
                      type="radio"
                      name="rating"
                      value="4"
                    />

                    <label
                      className={
                        first === String(id) && valueStart === "4"
                          ? "star-rating__ico--active"
                          : "star-rating__ico"
                      }
                      htmlFor={String(id)}
                      title="4"
                    ></label>

                    <input
                      className="star-rating__input"
                      // id="star-rating-3"
                      id={String(id)}
                      type="radio"
                      name="rating"
                      value="3"
                    />
                    <label
                      className={
                        first === String(id) && valueStart === "3"
                          ? "star-rating__ico--active"
                          : "star-rating__ico"
                      }
                      htmlFor={String(id)}
                      title="3"
                    ></label>
                    <input
                      className="star-rating__input"
                      // id="star-rating-2"
                      id={String(id)}
                      type="radio"
                      name="rating"
                      value="2"
                    />
                    <label
                      className={
                        first === String(id) && valueStart === "2"
                          ? "star-rating__ico--active"
                          : "star-rating__ico"
                      }
                      htmlFor={String(id)}
                      title="2"
                    ></label>
                    <input
                      className="star-rating__input"
                      id="star-rating-1"
                      type="radio"
                      name="rating"
                      value="1"
                    />
                    <label
                      className={
                        first === String(id) && valueStart === "1"
                          ? "star-rating__ico--active"
                          : "star-rating__ico"
                      }
                      htmlFor="star-rating-1"
                      title="1"
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
