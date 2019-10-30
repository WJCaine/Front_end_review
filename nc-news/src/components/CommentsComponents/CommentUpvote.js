import React from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function CommentUpvote({ commentId, index, vote, voteState }) {
  return (
    <div className={voteState === 1 ? "upvoted" : null}>
      <IoIosArrowDropupCircle onClick={() => vote(commentId, 1, index)} />
    </div>
  );
}
