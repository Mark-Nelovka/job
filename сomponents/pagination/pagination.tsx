import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import ArrowLeft from "../../assets/images/Arrow-pag-left.svg";
import ArrowRight from "../../assets/images/Arrow-pag-right.svg";
import { useThemeContext } from "../../context/context";
import qaz from "../../data.json";

interface IPagProps {
  getItem: (id: number, ariaLabel?: string) => void;
}

export const Pagination = ({ getItem }: IPagProps) => {
  const [pageActive, setPageActive] = useState(1);
  const [allPageCount, setAllPageCount] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const ctx = useThemeContext();

  useEffect(() => {
    const arr = [];
    if (ctx.items) {
      const getPageCount = ctx.items.length;
      for (let i = 1; i < getPageCount + 1; i += 1) {
        arr.push(i);
      }
    }
    setAllPageCount(arr);
    setPageCount(arr.slice(0, 5));
  }, [ctx.items]);

  const setPage = (event: React.MouseEvent) => {
    const { ariaLabel, id } = event.currentTarget as HTMLButtonElement;

    switch (ariaLabel) {
      case "increment":
        if (pageActive === allPageCount.length) {
          Notiflix.Notify.info("This page is last");
          return;
        }
        setPageActive((prevState) => prevState + 1);
        getItem(+id + 1, ariaLabel);
        if (pageActive + 1 > pageCount[pageCount.length - 1]) {
          const arr = allPageCount.slice(+id, +id + 5);
          setPageCount(arr);
          return;
        }
        break;
      case "decrement":
        if (pageActive === 1) {
          return;
        }
        setPageActive((prevState) => prevState - 1);
        getItem(+id - 1, ariaLabel);
        if (pageActive - 1 < pageCount[0]) {
          const arr = allPageCount.slice(+id - 6, +id - 1);
          setPageCount(arr);
          return;
        }
        break;

      default:
        setPageActive(+id);
        getItem(+id);
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
          alt="pag left"
          width="14"
          height="18"
          id={String(pageActive)}
        />
      </button>
      <ul className="pagination__number-container">
        {pageCount.map((pageNumber, inx) => {
          return (
            <li
              key={inx}
              onClick={setPage}
              id={String(pageNumber)}
              className={pageActive === pageNumber ? "qwe--active" : "qwe"}
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
              id={String(pageActive)}
              className={
                pageActive === allPageCount.length ? "qwe--active" : "qwe"
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
          alt="pag left"
          width="14"
          height="18"
        />
      </button>
    </div>
  );
};
