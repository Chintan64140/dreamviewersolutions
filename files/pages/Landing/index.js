"use client";
import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../../Components/Header";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import WorldMap from "@/components/ui/world-map";
import Earth from "@/components/ui/earth";
import { cn } from "@/lib/utils";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Section1 from "./components/section-1";
import Section2 from "./components/section-2";
import Section3 from "./components/section-3";
// import Earth from "@/components/ui/earth";

const Landing = () => {
  return (
    <Stack>
      <div className=" bg-[#1a1a1a] relative w-full ">
        <div className="w-full p-7 fixed top-0 left-0 z-1000000">
          <Header />
        </div>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </Stack>
  );
};

export default Landing;
