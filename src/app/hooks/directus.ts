import { CustomDirectusTypes } from "@/repos/types";
import { authentication, createDirectus, readMe, rest } from "@directus/sdk";
import { atom, useAtom } from "jotai";
import { atomWithStorage, loadable } from "jotai/utils";
import { NEXT_URL } from "next/dist/client/components/app-router-headers";
import { useEffect, useState } from "react";

const directus_url_atom = atom(
  process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055",
);
const directus_client_atom = atom((get, set) =>
  createDirectus<CustomDirectusTypes>(get(directus_url_atom))
    .with(authentication("cookie", { credentials: "include" }))
    //.with(authentication())
    .with(rest({ credentials: "include" })),
);

export const directus_user = atom<any>({});

const useDirectus = () => {
  const [directus] = useAtom(directus_client_atom);

  return directus;
};

export default useDirectus;
