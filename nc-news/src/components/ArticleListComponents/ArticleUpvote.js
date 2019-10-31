import React from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function ArticleUpvote({ articleId, index, vote, voteState }) {
  return (
    <div className={voteState[index] === 1 ? "upvoted" : null}>
      <IoIosArrowDropupCircle onClick={() => vote(articleId, 1, index)} />
    </div>
  );
}
