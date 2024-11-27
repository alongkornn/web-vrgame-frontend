import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <div className="flex">
      <h1>Logo</h1>
      <div className="flex mx-20">
        <Link className="mx-10" href="/player">
          Player
        </Link>
        <Link className="mx-10" href="/">
          Rank
        </Link>
        <Link className="mx-10" href="/manage">
          Manage Player
        </Link>
        <h1 className="mx-10">Profile</h1>
      </div>
    </div>
  );
}

export default Nav;
