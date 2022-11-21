import { useEffect, useState } from "react";
import { useGlobalState } from "../../state";
import { IPagProps } from "../../interfaces/pagination";
import Notiflix from "notiflix";
import ArrowLeft from "../../assets/images/Arrow-pag-left.svg";
import ArrowRight from "../../assets/images/Arrow-pag-right.svg";

export const Pagination = ({ getItem }: IPagProps) => {
  const [pageActive, setPageActive] = useState(1);
  const [allPageCount, setAllPageCount] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const allItems = useGlobalState("allItems");

  useEffect(() => {
    const arrForPageCount = [];
    if (allPageCount.length === 0) {
      const getPageCount = allItems[0].length / 5;
      for (let i = 1; i < getPageCount + 1; i += 1) {
        arrForPageCount.push(i);
      }
      setAllPageCount(arrForPageCount);
      setPageCount(arrForPageCount.slice(0, 5));
    }
  }, [allItems, allPageCount.length]);

  const setPage = (event: React.MouseEvent) => {
    const { ariaLabel, id } = event.currentTarget as HTMLButtonElement;
    let count = null;
    switch (ariaLabel) {
      case "increment":
        if (pageActive === allPageCount.length) {
          Notiflix.Notify.info("This page is last");
          return;
        }
        setPageActive((prevState) => prevState + 1);
        getItem(+id + 1);
        if (pageActive + 1 > pageCount[pageCount.length - 1]) {
          count = allPageCount.slice(+id, +id + 5);
          setPageCount(count);
          return;
        }
        break;
      case "decrement":
        if (pageActive === 1) {
          return;
        }
        setPageActive((prevState) => prevState - 1);
        getItem(+id - 1);
        if (pageActive - 1 < pageCount[0]) {
          count = allPageCount.slice(+id - 6, +id - 1);
          setPageCount(count);
          return;
        }
        break;

      default:
        setPageActive(+id);
        getItem(+id);
        if (+id === allPageCount.length) {
          count = allPageCount.slice(
            allPageCount[allPageCount.length - 6],
            allPageCount[allPageCount.length]
          );
          setPageCount(count);
        }
        break;
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={setPage}
        className="pagination__arrow-left-button"
        aria-label="decrement"
        id={String(pageActive)}
      >
        <ArrowLeft
          alt="arrow left"
          width="14"
          height="18"
          id={String(pageActive)}
        />
      </button>
      <ul className="pagination__number-list">
        {pageCount.map((pageNumber, inx) => {
          return (
            <li
              key={inx}
              onClick={setPage}
              id={String(pageNumber)}
              className={
                pageActive === pageNumber
                  ? "pagination__number-list__item--active"
                  : "pagination__number-list__item "
              }
            >
              {pageNumber}
            </li>
          );
        })}
        {!pageCount.includes(allPageCount[allPageCount.length - 3]) && (
          <>
            <li>
              {pageCount.includes(allPageCount[allPageCount.length - 3])
                ? allItems[0].length - 1
                : "..."}
            </li>
            <li
              id={String(allPageCount.length)}
              className={
                pageActive === allPageCount.length
                  ? "pagination__number-list__item--active"
                  : "pagination__number-list__item "
              }
              onClick={setPage}
            >
              {allPageCount.length}
            </li>
          </>
        )}
      </ul>
      <button
        onClick={setPage}
        className="pagination__arrow-right-button"
        id={String(pageActive)}
        aria-label="increment"
      >
        <ArrowRight
          id={String(pageActive)}
          alt="arrow right"
          width="14"
          height="18"
        />
      </button>
    </div>
  );
};
