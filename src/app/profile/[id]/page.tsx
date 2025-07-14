"use client";
import React, { createContext, useContext } from "react";
import HeroCarousel from "./HeroCarousel";
import Profile from "./Profile";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useSpazioProfile } from "@/app/hooks/swrHooks";
import { spaceProfileContext } from "./spaceProfileContext";
import Hero from "./Hero";

type Props = {};

function Page({}: Props) {
  const { id } = useParams();
  const { data, isLoading, error } = useSpazioProfile(id as string);
  if (isLoading) return "loading";
  if (error) return "error";
  return (
    //@ts-ignore
    <spaceProfileContext.Provider value={...data}>
      <div className="mx-auto">
        <NavBar />
        <HeroCarousel />
      </div>
    </spaceProfileContext.Provider>
  );
}

export default Page;
