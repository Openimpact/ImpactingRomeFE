import NavBar from "@/components/NavBar";
import React from "react";
import ApplicationList from "./ApplicationList";
import Footer from "@/components/Footer";

type Props = {};

function page({}: Props) {
  return (
    <div className="mx-auto">
      <NavBar />
      <ApplicationList />
      <Footer />
    </div>
  );
}

export default page;
