import { Box } from "@mui/material";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Header = () => {
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Services", link: "/services" },
    { label: "Portfolio", link: "/portfolio" },
    { label: "Careers", link: "/careers" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <Box
      className="h-25 overflow-hidden relative bg-[#a1a1a145]"
      sx={{
        borderRadius: "15px",
        background: "#ffffff21",
        borderRadius: "15px",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        // background: "linear-gradient(145deg, #d9d9d9,60%, transparent)",
        // borderRight: "0px",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none p-4 pr-6">
        <img
          src="/assets/logo/logo2.svg"
          className="w-37 sm:w-37 md:w-39 lg:w-47 xl:w-55 h-auto"
          alt="Logo"
        />
        <div>
          <nav className="flex space-x-6 pointer-events-auto ">
            {menuItems.map((item, index) => (
              <a
                href={`#${item.link}`}
                className="text-white raleway uppercase"
                key={index}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </Box>
  );
};

export default Header;
