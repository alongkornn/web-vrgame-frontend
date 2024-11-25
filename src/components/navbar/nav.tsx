import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <div className="flex">
      <h1>Logo</h1>
      <div className="flex mx-20">
        <Link className="mx-10" href="/">Player</Link>
        <Link className="mx-10" href="/">Rank</Link>
        <h1 className="mx-10">Profile</h1>
      </div>
    </div>
  );
}

export default Nav;
