import React from "react";

export const displayError = err => {
  return (
    <>
      <h2>{err.status}</h2>
      <p>{err.msg.msg}</p>
    </>
  );
};
