import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function ArticleDownvote({ articleId, index, vote, voteState }) {
  return (
    <div className={voteState[index] === -1 ? "downvoted" : null}>
      <IoIosArrowDropdownCircle onClick={() => vote(articleId, -1, index)} />
    </div>
  );
}
