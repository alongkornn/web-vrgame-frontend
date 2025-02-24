"use client";

import PlayerDetail from "@/components/pages/admins/PlayerDetail";
import { getId } from "../../../../../utils/params/params";

const Page = () => {
  const id = getId();

  return <PlayerDetail id={id} />;
};

export default Page;
