import React from "react";

export default function DisplayError({ err }) {
  return (
    <>
      <h2>{err.status}</h2>
      <p>{err.msg.msg}</p>
    </>
  );
}
