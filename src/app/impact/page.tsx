import React from "react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ImpactGrid from "./ImpactGrid";

type Props = {};

function Page({}: Props) {
  return (
    <div className="mx-auto">
      <NavBar />
      <ImpactGrid />
      <Footer />
    </div>
  );
}

export default Page;
