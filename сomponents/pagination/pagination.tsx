import React, { useCallback, useEffect, useMemo, useState } from "react";
import ArrowLeft from "../../assets/images/Arrow-pag-left.svg";
import ArrowRight from "../../assets/images/Arrow-pag-right.svg";
import { useThemeContext } from "../../context/context";
import usePagination from "../../hooks/usePagination";

// const  from ;
// {
//   firstContentIndex,
//   lastContentIndex,
//   nextPage,
//   prevPage,
//   page,
//   setPage,
//   totalPages,
// }

export const Pagination = () => {
  const [pageActive, setPageActive] = useState(1);
  const [allPageCount, setAllPageCount] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number[]>([]);
  const ctx = useThemeContext();
  // const qwe = usePagination({
  //   contentPerPage: 5,
  //   count: 2,
  // });

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
    if (pageActive === allPageCount.length) {
      return;
    }
    setPageActive((prevState) => prevState + 1);
    const { id } = event.currentTarget as HTMLButtonElement;

    if (pageActive + 1 > pageCount[pageCount.length - 1]) {
      const arr = allPageCount.slice(+id, +id + 5);
      setPageCount(arr);
      return;
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => setPageActive((prevState) => prevState - 1)}
        className="pagination__arrow-left-container"
      >
        <ArrowLeft alt="pag left" width="14" height="18" />
      </button>
      <ul className="pagination__number-container">
        {pageCount.map((pageNumber, inx) => {
          if (inx === 5) {
            return (
              <li className="qwe" key={inx}>
                ...
              </li>
            );
          } else {
            return (
              <li
                key={inx}
                onClick={() => setPageActive(pageNumber)}
                id={String(pageNumber)}
                className={pageActive === pageNumber ? "qwe--active" : "qwe"}
              >
                {pageNumber}
              </li>
            );
          }
        })}
        {!pageCount.includes(allPageCount[allPageCount.length - 3]) && (
          <>
            <li>
              {pageCount.includes(allPageCount[allPageCount.length - 3])
                ? ctx.items!.length - 1
                : "..."}
            </li>
            <li>{ctx.items && ctx.items.length}</li>
          </>
        )}
      </ul>
      <button
        onClick={setPage}
        className="pagination__arrow-right-container"
        id={String(pageActive)}
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
