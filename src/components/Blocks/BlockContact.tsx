import React from "react";
import BlockWrapper from "./BlockWrapper";
import BlockTitle from "./BlockTitle";
import Link from "next/link";
import { useSpaceProfileContext } from "@/app/profile/[id]/spaceProfileContext";

type Props = {};

function BlockContact({}: Props) {
  const profile = useSpaceProfileContext();
  return (
    <BlockWrapper>
      <BlockTitle>Informazioni :</BlockTitle>
      <ul className="text-lg md:text-xl md:m-4 px-6 tracking-tight text-gray-800 text-center">
        <li className="font-semibold">{profile.data.name}</li>
        <li className="font-semibold mt-2">{profile.data.formatted_address}</li>
        <li className="underline text-blue-300 mt-2">
          <Link href={profile.data.website}>Visita il nostro sito</Link>
        </li>
        <li className="underline text-blue-300 mt-2">
          <Link href={profile.data.google_directions_url}>
            Indicazioni per raggiungerci
          </Link>
          <li className="mt-2">{profile.data.business_status}</li>
        </li>
      </ul>
    </BlockWrapper>
  );
}

export default BlockContact;
