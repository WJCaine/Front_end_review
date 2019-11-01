import React from "react";

export default function Pagination({ changePage, page, maxPage }) {
  return (
    <div id="paginator" className="table">
      <button
        className="pageButton"
        disabled={page === 1}
        onClick={() => changePage(-1)}
      >
        Prev
      </button>
      <ul id="horizontal-list">
        {makePageArray(page, maxPage).map(num => {
          return (
            <li className="horizontal-list li" key={num}>
              <button
                className="numbtn"
                onClick={() => {
                  changePage(num - page);
                }}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="pageButton"
        disabled={page === maxPage}
        onClick={() => changePage(1)}
      >
        Next
      </button>
    </div>
  );
}

function makePageArray(num, maxPage) {
  const pageArray = [];
  for (let i = num - 3; i < num + 3; i++)
    if (i > 0 && i <= maxPage) {
      pageArray.push(i);
    }
  return pageArray;
}
