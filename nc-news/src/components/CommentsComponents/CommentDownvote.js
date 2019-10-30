import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function CommentDownvote({ commentId, index, vote, voteState }) {
  return (
    <div className={voteState === -1 ? "downvoted" : null}>
      <IoIosArrowDropdownCircle onClick={() => vote(commentId, -1, index)} />
    </div>
  );
}
