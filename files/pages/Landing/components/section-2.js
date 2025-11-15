import React from "react";
import { cn } from "@/lib/utils";
import { Box, Grid } from "@mui/material";
import { Meteors } from "@/components/ui/meteors";
import { StarsBackground } from "@/components/ui/stars-background";

const Section2 = () => {
  return (
    <section id="about" className="sticky top-0 h-screen bg-[#fff]">
      <Box
        className="h-full"
        sx={{
          background: "url(./assets/computer.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        {/* <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        /> */}
        <div className="absolute z-10000 h-full w-full bg-[#000000ad] flex flex-col gap-2 justify-center items-center ">
          <div className="flex justify-center gap-8 items-center w-full px-4 ">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="start"
            >
              <Grid size={{ sm: 7, md: 4 }}>
                <Box
                  className="relative  max-w-xl"
                  sx={{
                    "& #gradient_": {
                      transform: "scale(0.90)",
                      transition: "transform 0.3s ease-in-out",
                    },
                    "&:hover": {
                      "& #gradient_": {
                        transform: "scale(0.95)",
                      },
                    },
                  }}
                >
                  <div
                    id="gradient_"
                    className="absolute inset-0 h-full w-full scale-[0.90]  transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl"
                  />
                  <div className="relative z-10 flex flex-row sm:flex-col gap-6 justify-center items-center">
                    <div className="p-4 rounded-[10px] bg-[#081621] z-10000 backdrop-blur-md bg-[#1f1f1f]/40 border border-white/10">
                      <img
                        src={"./assets/aboutus.png"}
                        className="rounded-[5px]"
                      />
                    </div>
                  </div>
                </Box>
              </Grid>
              <Grid size={{ sm: 7, md: 4 }}>
                <div className="flex flex-col gap-8">
                  <p className="text-[40px] text-[#fff] raleway font-[600]">
                    ABOUT US
                  </p>
                  <StarsBackground />
                  <Box
                    className="momo"
                    sx={{
                      "& p": {
                        marginBottom: "16px",
                        lineHeight: "1.6",
                        color: "#b6c1d0ff",
                        fontSize: "19px",
                      },
                    }}
                  >
                    <p>
                      We excel in Web Development, Mobile App Development
                      (Android & iOS), SEO, Digital Marketing across major
                      platforms, and Custom Enterprise Application Development.
                      With a highly skilled and experienced team, we are
                      committed to delivering solutions that exceed
                      expectations.
                    </p>
                    <p>
                      We take pride in offering secure, reliable, and
                      high-quality IT services while safeguarding your business
                      and critical data.
                    </p>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </section>
  );
};

export default Section2;
