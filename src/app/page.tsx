import BlogCards from "@/components/BlogCards";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ImageLeft from "@/components/ImageLeft";
import MainHero from "@/components/MainHero";
import NavBar from "@/components/NavBar";
import React from "react";
import RegisterOperatore from "./register/operatore/RegisterOperatore";
import SignUpFormOperatori from "./register/operatore/SignUpFormOperatori";
type Props = {};

function Page({}: Props) {
  return (
    <div>
      <NavBar />
      <CtaSection />
      {/* <ImageLeft />
      <MainHero />
      <BlogCards />
      <Footer /> */} 
    </div>
  );
}

export default Page;
