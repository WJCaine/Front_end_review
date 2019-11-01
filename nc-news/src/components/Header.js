import React from "react";
import { Link } from "@reach/router";

export default function Header() {
  return (
    <h1 className="title">
      <Link to="/">NC-news</Link>
    </h1>
  );
}
