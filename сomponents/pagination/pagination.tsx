import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/context";
import { IPagProps } from "../../interfaces/pagination";
import ArrowLeft from "../../assets/images/Arrow-pag-left.svg";
import ArrowRight from "../../assets/images/Arrow-pag-right.svg";

export const Pagination = ({ getItem }: IPagProps) => {
  const [pageActive, setPageActive] = useState(1);
  const [allPageCount, setAllPageCount] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const ctx = useThemeContext();

  useEffect(() => {
    const arrForPageCount = [];
    if (ctx.items) {
      const getPageCount = ctx.items.length;
      for (let i = 1; i < getPageCount + 1; i += 1) {
        arrForPageCount.push(i);
      }
    }
    setAllPageCount(arrForPageCount);
    setPageCount(arrForPageCount.slice(0, 5));
  }, [ctx.items]);

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
          const arr = allPageCount.slice(
            allPageCount[allPageCount.length - 6],
            allPageCount[allPageCount.length]
          );
          setPageCount(arr);
        }
        break;
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={setPage}
        className="pagination__arrow-left-container"
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
                ? ctx.items!.length - 1
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
              {ctx.items && ctx.items.length}
            </li>
          </>
        )}
      </ul>
      <button
        onClick={setPage}
        className="pagination__arrow-right-container"
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
