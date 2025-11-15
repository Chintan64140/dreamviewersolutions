import { LampContainer } from "@/components/ui/lamp";
import { cn } from "@/lib/utils";
import { Box } from "@mui/material";
import React from "react";
import { motion } from "motion/react";


const Section3 = () => {
  return (
    <>
      <section id="skill" className="sticky top-1 h-screen bg-[#fff]">
        <Box
          sx={{
            backgroundImage: 'url("/assets/skills.jpg")',
          }}
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
        >
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />
          <div className="w-full h-full bg-[linear-gradient(0deg,#00000aa1,#1e1e1e52)] relative flex justify-center items-center">
            
            
          </div>
        </Box>
      </section>
    </>
  );
};

export default Section3;
