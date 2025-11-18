import { LampContainer } from "@/components/ui/lamp";
import { cn } from "@/lib/utils";
import { Box } from "@mui/material";
import React from "react";
import { motion, percent } from "motion/react";
import { SparklesCore } from "@/components/ui/sparkles";
import SkillsCircles from "@/components/ui/SkillsCircles";
import { Button } from "@/components/ui/moving-border";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const Section3 = () => {
  const skills = [
    {
      name: "Web Development",
      percentage: 95,
    },
    { name: "Web Design", percentage: 85 },
    {
      name: "Android App Development",
      percentage: 90,
    },
    { name: "iOS App Development", percentage: 80 },

    { name: "SEO", percentage: 75 },
    { name: "Game Development", percentage: 70 },
    {
      name: "Digital Marketing",
      percentage: 80,
    },
    { name: "graphic design", percentage: 85 },
  ];

  return (
    <>
      <section id="skill" className="sticky top-1 h-screen bg-[#fff]">
        <Box
          sx={{
            backgroundImage: 'url("/assets/skills.jpg")',
          }}
          className="w-full h-full bg-cover bg-center bg-no-repeat relative"
        >
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={40}
            className="w-full h-full absolute"
            particleColor="#c2c2c2ff"
          />
          <div className="w-full h-full bg-[linear-gradient(0deg,#000002bf,#1e1e1e52)] relative flex justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <div className="w-full max-w-[70%] backdrop-blur-md bg-[#1f1f1f]/40 border border-white/10 rounded-xl p-6">
                <div className="relative px-6 py-8 pt-0">
                  <p className="text-[40px] text-[#ffffff] poppins font-[600] text-center">
                    Our Skills & Expertise
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <p className="text-[#fff] momo uppercase">
                            {skill.name}
                          </p>
                        </div>
                        <div className=" bg-[#7c8fa17a] w-full rounded-[8px] relative">
                          <Box
                            className="h-4 bg-[#8cc9ff] transition-all rounded-[8px] duration-1000 ease-in-out"
                            sx={{
                              width: `${skill.percentage}%`,
                              background:
                                "linear-gradient(45deg, #4575bd, #9c6cb5)",
                              boxShadow: "0px 0px 13px -4px #7d7d7d",
                            }}
                          ></Box>
                          <Box
                            sx={{
                              left: `${skill.percentage}%`,
                              top: "-32px",
                              position: "absolute",

                            }}
                            className="bg-[red]"
                          >
                            <p className="text-[#fff] momo uppercase">
                              {skill.percentage}
                            </p>
                          </Box>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </section>
    </>
  );
};

export default Section3;
