import Earth from "@/components/ui/Earth";
import React from "react";
import { cn } from "@/lib/utils";

const Section1 = () => {
  return (
    <section id="home" className="sticky top-0 h-screen bg-[#1a1a1a] w-full">
      <div className="absolute z-10000 h-full w-full bg-[#000000ad] flex flex-col gap-2 justify-center items-center ">
        <p className="text-[30px] text-[#ababab] raleway font-[400]">
          Empowering Digital Transformation
        </p>
        <p className="text-[70px] text-[#fff] poppins font-[600] uppercase">
          Dream Viewer Solutions
        </p>
        <p className="text-center text-[25px] text-[#8cc9ff] elms font-[300] w-[60%]">
          We deliver innovative, client-focused, and product-based digital
          solutios that help businesses transform ideas into powerful, scalable,
          and future-ready technologies.
        </p>
      </div>

      <div
        style={{
          background: "#081621",
          height: "100vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        <div className="w-full h-full flex justify-center items-center z-1000">
          <Earth />
        </div>
      </div>
    </section>
  );
};

export default Section1;
